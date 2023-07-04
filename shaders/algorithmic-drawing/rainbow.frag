#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.01, pct, st.y) -
        smoothstep(pct, pct + 0.01, st.y);
}

float wave(float x) {
    return 0.5 * sin(1.6 * PI * x) + 0.5;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    vec3 color;
    color.r = wave(st.x + 0.3);
    color.g = wave(st.x - 0.1);
    color.b = wave(st.x - 0.4);

    // Reference lines
    color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, color.r));
    color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, color.g));
    color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, color.b));

    gl_FragColor = vec4(color, 1.0);
}
