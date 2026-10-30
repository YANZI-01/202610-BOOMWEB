precision mediump float;
uniform vec4 u_scene;
uniform vec3 u_paper;

// A slow, defocused blue ribbon on the current page's ground color.
void main() {
  vec2 uv = gl_FragCoord.xy / u_scene.xy;
  float time = u_scene.z;
  float bend = sin(uv.y * 5.4 + time * .22) * .19;
  float drift = sin(time * .13) * .07;
  float center = .55 + bend + drift;
  float width = .10 + .035 * sin(uv.y * 6.0 - time * .17);
  float distanceToRibbon = abs(uv.x - center);
  float ribbon = exp(-pow(distanceToRibbon / width, 2.0) * .65);
  float haze = exp(-pow(distanceToRibbon / (width * 2.1), 2.0));
  vec3 paper = u_paper;
  vec3 paleBlue = vec3(.69, .81, .85);
  vec3 inkBlue = vec3(.10, .43, .71);
  vec3 color = mix(paper, paleBlue, haze * .55);
  // Keep the central reading area light enough for navy body text at every frame.
  float readingZone = exp(-pow(abs(uv.x - .5) / .32, 4.0));
  float intensity = mix(.85, .48, readingZone);
  color = mix(color, inkBlue, ribbon * intensity);
  gl_FragColor = vec4(color, 1.0);
}
