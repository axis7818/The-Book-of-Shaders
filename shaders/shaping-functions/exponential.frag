#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
	return
		smoothstep(pct - 0.02, pct, st.y) -
		smoothstep(pct, pct + 0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;

	// This is the shaping function
	float y = pow(2.0, st.x) - 1.0;

	// Color of the shaping function
	vec3 color = vec3(y);

	// Composite the line
	float pct = plot(st, y);
	color = (1.0 - pct) * color + pct * vec3(1.0, 0.0, 1.0);

	gl_FragColor = vec4(color, 1.0);
}
