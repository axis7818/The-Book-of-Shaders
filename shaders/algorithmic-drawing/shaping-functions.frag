#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float saturate(float x) {
	return clamp(x, 0.0, 1.0);
}

/** Shaping Functions */

float linear(float x, float slope, float offset) {
	return slope * x + offset;
}

float quadratic(float x, float a, float b, float c) {
	return a * x * x + b * x + c;
}

/** Fragment Shader */

float lineThickness = 0.02;
vec3 plotColor = vec3(1.0, 0.0, 1.0);

float plot(vec2 st, float pct) {
	return
		smoothstep(pct - lineThickness, pct, st.y) -
		smoothstep(pct, pct + lineThickness, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;
	float mid = clamp(u_mouse.x / u_resolution.x, 0.0001, 0.999);

	// This is the shaping function
	float y = smoothstep(0.0, mid, st.x) * smoothstep(1.0, mid, st.x);
	// float y = step(0.5, st.x);
	// float y = smoothstep(0.4, 0.6, st.x);

	// Color of the shaping function
	vec3 color = vec3(y);

	// Composite the line
	float pct = plot(st, y);
	color = (1.0 - pct) * color + pct * plotColor;

	gl_FragColor = vec4(color, 1.0);
}
