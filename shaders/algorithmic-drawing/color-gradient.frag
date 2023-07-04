#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

// If true, plot reference lines
#define PLOT_LINES true

// If true, show a reference palette at the top of the canvas
#define SHOW_REFERENCE_PALETTE true

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define ST_X 0      // mix based on canvas x position
#define MOUSE_X 1   // mix based on mouse x position
#define TIME 2      // mix based on time (loops)
int mode = ST_X;

vec3 colorA = vec3(0.39, 0.38, 0.97);
vec3 colorB = vec3(1.0, 0.92, 0.62);
vec3 colorC = vec3(1.0, 0.44, 0.11);

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.01, pct, st.y) -
        smoothstep(pct, pct + 0.01, st.y);
}

vec3 shapingFunction(float x) {
    vec3 color;
    color.r = smoothstep(0.0, 1.0, x);
    color.g = sin(x * PI);
    color.b = pow(x, 0.5);
    return color;
}

// mix between colorA and colorB from 0.0 to 0.5
// mix between colorB and colorC from 0.5 to 1.0
vec3 threeColorMix(vec3 x) {
    vec3 color;
    color = mix(colorA, colorB, 2.0 * x);
    color = mix(color, colorC, 2.0 * x - 1.0);
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouseSt = u_mouse / u_resolution;

    if (SHOW_REFERENCE_PALETTE) {
        if (st.y > 0.95) {
            gl_FragColor = vec4(threeColorMix(vec3(st.x)), 1.0);
            return;
        } else if (st.y > 0.945) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }
    }

    float x = mode == ST_X ? st.x : mode == MOUSE_X ? mouseSt.x : fract(u_time / 8.0);

    vec3 pct = shapingFunction(x);

    vec3 color = threeColorMix(pct);

    // Plot transition lines for each channel
    if (PLOT_LINES) {
        if (mode != ST_X && st.x > x - 0.005 && st.x < x + 0.005) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }
        pct = shapingFunction(st.x);
        color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
        color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
        color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));
    }

    gl_FragColor = vec4(color, 1.0);
}
