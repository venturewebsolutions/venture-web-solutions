ffmpeg -i hero.mp4 -filter_complex "
[0:v]trim=0:2,setpts=PTS-STARTPTS,fps=24[second];
[0:v]trim=2:10,setpts=PTS-STARTPTS,fps=24[first];
[first][second]xfade=transition=fade:duration=2.0:offset=6.0,format=yuv420p[loop];

[loop]split=3[v1][v2][v3];

[v1]scale=1920:-2,format=yuv420p[v1080];
[v2]scale=1280:-2,format=yuv420p[v720];
[v3]scale=854:-2,format=yuv420p[v480]
" \
-map "[v1080]" -c:v libx264 -crf 27 -preset slow -movflags +faststart -an -profile:v high -level 4.0 hero-1080p.mp4 \
-map "[v720]"  -c:v libx264 -crf 29 -preset slow -movflags +faststart -an -profile:v high -level 4.0 hero-720p.mp4 \
-map "[v480]"  -c:v libx264 -crf 31 -preset slow -movflags +faststart -an -profile:v high -level 4.0 hero-480p.mp4 \
-y
