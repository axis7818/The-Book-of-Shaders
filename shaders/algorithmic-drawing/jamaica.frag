#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorBlack = vec3(0.0, 0.0, 0.0);
vec3 colorGreen = vec3(0, 0.466667, 0.286275);
vec3 colorYellow = vec3(1.0, 0.721569, 0.109804);
float lineWidth = 0.09;

float yellowLine(vec2 st, float pct) {
    return step(pct - lineWidth, st.y) - step(pct + lineWidth, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color;

    float line1 = st.x;
    float line2 = -st.x + 1.0;

    if (st.y > line1 && st.y > line2 || st.y < line1 && st.y < line2) {
        color = colorGreen;
    } else {
        color = colorBlack;
    }

    color = mix(color, colorYellow, yellowLine(st, line1));
    color = mix(color, colorYellow, yellowLine(st, line2));
    gl_FragColor = vec4(color, 1.0);
}
