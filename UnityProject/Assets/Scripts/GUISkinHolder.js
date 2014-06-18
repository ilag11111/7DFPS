#pragma strict

var gui_skin:GUISkin;
var sound_scream : AudioClip[];
var sound_tape_content : AudioClip[];
var sound_tape_start : AudioClip;
var sound_tape_end : AudioClip;
var sound_tape_background : AudioClip;
var tape_object : GameObject;
var win_sting : AudioClip;
var weapons : GameObject[];
var weapon : GameObject;
var flashlight_object : GameObject;
var has_flashlight = false;

function Awake () {
	// Weapon 0 - M1911
	// Weapon 1 - S&W Victory
	// Weapon 2 - Glock 17
	//weapon = weapons[1];
	weapon = weapons[Random.Range(0,weapons.length)];
}

function Start () {
}

function Update () {
}
