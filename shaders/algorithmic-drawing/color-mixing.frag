#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(1.000, 0.763, 0.242);
vec3 colorB = vec3(0.912, 0.321, 0.453);

float lineThickness = 0.02;
vec3 plotColor = vec3(0.0, 1.0, 0.0);

float plot(vec2 st, float pct) {
	return
		smoothstep(pct - lineThickness, pct, st.y) -
		smoothstep(pct, pct + lineThickness, st.y);
}

float func1(float x) {
	return smoothstep(0.7, 1.0, fract(x));
}

float func2(float x) {
	return pow(fract(x), 2.0);
}

float shapingFunction(float x) {
	float stage = (sin(2.0 * PI * x) + 1.0) / 2.0;
	stage = step(0.5, stage);

	float stage1 = func1(2.0 * x);
	float stage2 = func2(-2.0 * x + 2.0);
	return stage * stage1 + (1.0 - stage) * stage2;
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;

	// shaping function wrt time
	float pct = shapingFunction(u_time / 1.2);

	// Choose the color
	vec3 color = mix(colorA, colorB, pct);

	// Overlay a line
	float line = plot(st, shapingFunction(st.x));
	color = (1.0 - line) * color + line * plotColor;

	// Result
	gl_FragColor = vec4(color, 1.0);
}
