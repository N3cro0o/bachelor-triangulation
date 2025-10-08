class_name Root2D extends Node2D

@onready var line_left: Line2D = $LineLeft
@onready var line_right: Line2D = $LineRight
@onready var middle_point: Sprite2D = $MiddlePoint
@onready var target_point: Sprite2D = $Target
@onready var label: Label = $Label

@onready var middle_point_label: Label = $MiddlePoint/Label
@onready var target_point_label: Label = $Target/Label


var rotate_right: bool = false
var speed := 10.0
var distance = 0

var line_rotation := [90.0, 90.0]

func _ready():
	distance = abs(line_left.position.x - line_right.position.x)
	middle_point.position = Vector2(line_left.position.x + distance / 2, line_left.position.y)
	
	middle_point_label.text = "X: %d Y: %d" % [middle_point.position.x, middle_point.position.y]
	target_point_label.text = "X: %d Y: %d" % [target_point.position.x, target_point.position.y]

func _process(delta):
	rotate_line(delta)
	if Input.is_action_just_pressed("ui_accept"):
		rotate_right = !rotate_right
	if line_rotation[0] + line_rotation[1] < 180:
		get_result()
	if Input.is_key_pressed(KEY_F1):
		get_best_result()

func rotate_line(delta: float):
	if rotate_right:
		if Input.is_action_pressed("ui_left"):
			line_right.rotation -= deg_to_rad(speed * delta)
			line_rotation[1] -= speed * delta
		elif Input.is_action_pressed("ui_right"):
			line_right.rotation += deg_to_rad(speed * delta)
			line_rotation[1] += speed * delta
	else:
		if Input.is_action_pressed("ui_left"):
			line_left.rotation -= deg_to_rad(speed * delta)
			line_rotation[0] += speed * delta
		elif Input.is_action_pressed("ui_right"):
			line_left.rotation += deg_to_rad(speed * delta)
			line_rotation[0] -= speed * delta
			
func get_result():
	var top_angle = 180 - line_rotation[1] - line_rotation[0]
	label.text = "Angles: Left: %f, Right: %f, Target: %f" % [line_rotation[0],
			line_rotation[1], top_angle]
	var sines := [sin(deg_to_rad(line_rotation[0])), sin(deg_to_rad(line_rotation[1])), 
			sin(deg_to_rad(top_angle))]
	label.text += "\nSines: Left: %f, Right: %f, Target: %f" % [sines[0], sines[1], sines[2]]
	var factor = distance / sines[2]
	label.text += "\nFactor: %f" % factor
	var left_side = factor * sines[1]
	var right_side = factor * sines[0]
	label.text += "\nSide lengths: Left: %f, Right: %f\nDiff: %f" % [left_side, right_side, left_side - right_side]
	var middle_angle = 180 - line_rotation[0] - (top_angle / 2)
	
	label.text += "\n\nSine calculations:"
	factor = left_side / sin(deg_to_rad(middle_angle))
	label.text += "\nNew angle: %f, New factor: %f" % [middle_angle, factor]
	var real_distance = middle_point.position.distance_to(target_point.position)
	label.text += "\nDistance: %f" % [factor * sines[0]]
	label.text += "\nReal Distance: %f, Offset: %f (%d%%)" % [real_distance, abs(factor * sines[0] - real_distance),
			abs(factor * sines[0] - real_distance) / real_distance * 100]
	
	label.text += "\n\nCosine calculations:"
	var dist = sqrt(pow(left_side, 2) + pow(distance / 2, 2) - (left_side * distance * cos(deg_to_rad(line_rotation[0]))))
	label.text += "\nDistance: %f" % [dist]
	label.text += "\nReal Distance: %f, Offset: %f (%d%%)" % [real_distance, abs(dist - real_distance),
			abs(dist - real_distance) / real_distance * 100]

func get_best_result():
	line_left.rotation = (line_left.position - target_point.position).angle() - PI/2
	line_right.rotation = (line_right.position - target_point.position).angle() - PI/2
	line_rotation[0] = 90 - rad_to_deg(line_left.rotation)
	line_rotation[1] = 90 + rad_to_deg(line_right.rotation)
