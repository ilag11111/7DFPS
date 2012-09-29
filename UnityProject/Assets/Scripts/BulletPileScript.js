#pragma strict

function Start () {
	var holder = GameObject.Find("gui_skin_holder").GetComponent(GUISkinHolder);
	var weapon_holder = holder.weapon.GetComponent(WeaponHolder);
	var num_bullets = Random.Range(1,6);
	if(Random.Range(0,6) == 0 && weapon_holder.mag_object){
		var mag : GameObject = Instantiate(weapon_holder.mag_object);
		mag.AddComponent(Rigidbody);
		mag.rigidbody.interpolation = RigidbodyInterpolation.Interpolate;
		mag.transform.position = transform.position + 
			Vector3(Random.Range(-0.1,0.1),
					Random.Range(0.2,0.4),
					Random.Range(-0.1,0.1));
		mag.transform.rotation = BulletScript.RandomOrientation();
	} else {
		for(var i=0; i<num_bullets; ++i){
			var bullet : GameObject = Instantiate(weapon_holder.bullet_object);
			bullet.transform.position = transform.position + 
				Vector3(Random.Range(-0.1,0.1),
						Random.Range(0.0,0.2),
						Random.Range(-0.1,0.1));
			bullet.transform.rotation = BulletScript.RandomOrientation();
			bullet.AddComponent(Rigidbody);
			bullet.GetComponent(ShellCasingScript).collided = true;
		}
	}
	if(Random.Range(0,4) == 0){
		var tape : GameObject = Instantiate(holder.tape_object);
		tape.transform.position = transform.position + 
			Vector3(Random.Range(-0.1,0.1),
					Random.Range(0.0,0.2),
					Random.Range(-0.1,0.1));
		tape.transform.rotation = BulletScript.RandomOrientation();		
	}
	if(Random.Range(0,4) == 0 && !holder.has_flashlight ){
		var flashlight : GameObject = Instantiate(holder.flashlight_object);
		flashlight.transform.position = transform.position + 
			Vector3(Random.Range(-0.1,0.1),
					Random.Range(0.2,0.4),
					Random.Range(-0.1,0.1));
		flashlight.transform.rotation = BulletScript.RandomOrientation();
	}
	
}

function Update () {

}