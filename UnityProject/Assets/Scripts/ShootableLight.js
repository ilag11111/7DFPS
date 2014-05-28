#pragma strict

var destroy_effect : GameObject;
var light_color = Color(1,1,1);
var destroyed = false;
enum LightType {AIRPLANE_BLINK, NORMAL, FLICKER}
public var light_type = LightType.NORMAL;
private var blink_delay = 0.0;

private var light_amount = 1.0;

private var kSleepDistance = 20.0;
private var playerTemp:GameObject = null;

function WasShot(obj : GameObject, pos : Vector3, vel : Vector3) {
	if(!destroyed){
		destroyed = true;
		light_amount = 0.0;
		ChangeLight();
		Instantiate(destroy_effect, transform.FindChild("bulb").position, Quaternion.identity);
	}
	if(obj && obj.collider && obj.collider.material.name == "glass (Instance)"){
		GameObject.Destroy(obj);
	}
}

function Start () {
	ChangeLight ();
}

function Update () {
	if (playerTemp == null){
		playerTemp = GameObject.Find("Player");
	}
	if(!destroyed){
		switch(light_type){
			case LightType.AIRPLANE_BLINK:
				if(blink_delay <= 0.0){
					blink_delay = 1.0;
					if(light_amount == 1.0){
						light_amount = 0.0;
					} else {
						light_amount = 1.0;
					}
					ChangeLight();
				}
				blink_delay -= Time.deltaTime;
				break;
		}
		if(Vector3.Distance(playerTemp.transform.position, transform.position) > kSleepDistance){
			for(var light : Light in gameObject.GetComponentsInChildren(Light)){
				light.enabled = false;
				transform.FindChild("bulb").renderer.enabled = false;
			}
		} else {
			for(var light : Light in gameObject.GetComponentsInChildren(Light)){
				light.enabled = true;
				transform.FindChild("bulb").renderer.enabled = true;
			}
		}
	}
}

function ChangeLight () {
	var combined_color = Color(light_color.r * light_amount,light_color.g * light_amount,light_color.b * light_amount);
	for(var light : Light in gameObject.GetComponentsInChildren(Light)){
		light.color = combined_color;
		light.renderMode = LightRenderMode.ForcePixel;
	}
	for(var renderer : MeshRenderer in gameObject.GetComponentsInChildren(MeshRenderer)){
		renderer.material.SetColor("_Illum", combined_color);
		if(renderer.gameObject.name == "shade"){
			renderer.material.SetColor("_Illum", combined_color * 0.5);
		}
	}
}
