#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float frequency = 50.0;
float speed = 0.1;

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	vec2 mouseSt = u_mouse.xy / u_resolution.xy;

	vec2 delta = st - mouseSt;
	float dist = length(delta);
	dist -= u_time * speed;

	float red = sin(dist * frequency);
	float green = -sin(dist * frequency);
	gl_FragColor = vec4(red, green, 0.0, 1.0);
}
