var combatList = [];
combatList.push({GUID: guid(), Name: "Bellagar", Class: "Warrior", Type: "Friendly", HP: 14, MaxHP: 14, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
combatList.push({GUID: guid(), Name: "Mathias", Class: "Brute", Type: "Friendly", HP: 12, MaxHP: 12, Initiative: 3, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "DelSordaCool", Class: "Sorcerer", Type: "Friendly", HP: 25, MaxHP: 25, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Makayla", Class: "Shaman", Type: "Friendly", HP: 20, MaxHP: 20, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Auldous", Class: "Archer", Type: "Friendly", HP: 20, MaxHP: 20, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Stephanie", Class: "Cleric", Type: "Friendly", HP: 20, MaxHP: 20, Initiative: 7, IMG: "", Effects: []});

var explorationList = [];
explorationList.push({GUID: guid(), Name: "Bellagar", Class: "Thief", Type: "Friendly", HP: 11, MaxHP: 11, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
explorationList.push({GUID: guid(), Name: "Mathias", Class: "Hunter", Type: "Friendly", HP: 11, MaxHP: 11, Initiative: 3, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "DelSordaCool", Class: "Delver", Type: "Friendly", HP: 21, MaxHP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Makayla", Class: "Witch", Type: "Friendly", HP: 21, MaxHP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Auldous", Class: "Mechanist", Type: "Friendly", HP: 21, MaxHP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Stephanie", Class: "Pilgrim", Type: "Friendly", HP: 21, MaxHP: 21, Initiative: 7, IMG: "", Effects: []});

var interactionList = [];
interactionList.push({GUID: guid(), Name: "Bellagar", Class: "Bodyguard", Type: "Friendly", HP: 12, MaxHP: 12, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
interactionList.push({GUID: guid(), Name: "Mathias", Class: "Occultist", Type: "Friendly", HP: 12, MaxHP: 12, Initiative: 3, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "DelSordaCool", Class: "Warrior", Type: "Friendly", HP: 22, MaxHP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Makayla", Class: "Merchant", Type: "Friendly", HP: 22, MaxHP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Auldous", Class: "Warrior", Type: "Friendly", HP: 22, MaxHP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Stephanie", Class: "Warrior", Type: "Friendly", HP: 22, MaxHP: 22, Initiative: 7, IMG: "", Effects: []});


var entityList = [];

function loadCombat()
{
  entityList = combatList;
  drawEntityList();
}
function loadExploration()
{
  entityList = explorationList;
  drawEntityList();
}
function loadInteraction()
{
  entityList = interactionList;
  drawEntityList();
}

$(document).ready(function () {
  entityList = combatList;
	drawEntityList();
});


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

$('#adjustHpModal').on('show.bs.modal', function (event) {
	var trigger = $(event.relatedTarget) // Button that triggered the modal
	// We are editing an existing character
	if(trigger.data('charid'))
	{
		var position = entityList.indexOfField("GUID", trigger.data('charid'))
		if(trigger.data('adjustment') == "heal")
		{
			$("#adjustHpType").val("heal");
			$("#hpAdjustmentLabel").text("Heal " + entityList[position].Name + " for: ");
		}
		else
		{
			$("#adjustHpType").val("damage");
			$("#hpAdjustmentLabel").text("Damage " + entityList[position].Name + " for: ");
		}
			
		
		$("#adjustHpGUID").val(entityList[position].GUID)
		$("#hpAdjustment").val(0);
	}
});

$('#editEntityModal').on('show.bs.modal', function (event) {
  var trigger = $(event.relatedTarget) // Button that triggered the modal
  // We are editing an existing character
  if(trigger.data('charid'))
  {
	  // Find entry in array
	  var position = entityList.indexOfField("GUID", trigger.data('charid'))
	  if(position != -1)
	  {
		$("#entityName").val(entityList[position].Name)
		$("#entityHP").val(entityList[position].MaxHP)
		$("#entityClass").val(entityList[position].Class)
		$("#entityInit").val(entityList[position].Initiative)
		$("#entityImage").val(entityList[position].IMG)
		$("#entityGUID").val(entityList[position].GUID)
		var type = []
		type.push(entityList[position].Type)
		$('input[name=entityType]').val(type)
		$('input[name=entityType]').parent().removeClass("active");
		$('input[name=entityType]:checked').parent().addClass("active");
	  }
	  else
	  {
		  console.log("An error occurred searching for the entity in the list.");
	  }
  }
  else // We need to create a new entity
  {
		var id = guid();
		entityList.push({GUID: id, Name: "", HP: 0, Initiative: 0, IMG: "", Effects: []});
		$("#entityName").val("")
		$("#entityHP").val("")
		$("#entityClass").val("")
		$("#entityInit").val("")
		$("#entityImage").val("")
		var type = []
		$('input[name=entityType]').val(type)
		$("#entityGUID").val(id)
  }
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
})

$("#saveHPModalChanges").click(function() {
	var position = entityList.indexOfField("GUID", $("#adjustHpGUID").val())
		if(position != -1)
		{
			if($("#adjustHpType").val() == "heal")
			{
				entityList[position].HP = parseInt(entityList[position].HP) + parseInt($("#hpAdjustment").val());
				if(parseInt(entityList[position].HP) > parseInt(entityList[position].MaxHP))
					entityList[position].HP = parseInt(entityList[position].MaxHP);
			}
			else
			{
				entityList[position].HP = parseInt(entityList[position].HP) - parseInt($("#hpAdjustment").val());
				if(entityList[position].HP < 0)
					entityList[position].HP = 0;
			}
			
		}
		drawEntityList();
		$('#adjustHpModal').modal('hide')
});

// Update items
$("#saveModalChanges").click(function(){
		var position = entityList.indexOfField("GUID", $("#entityGUID").val())
		if(position != -1)
		{
			entityList[position].Name = $("#entityName").val()
			entityList[position].HP = $("#entityHP").val()
			entityList[position].MaxHP = $("#entityHP").val()
			entityList[position].Class = $("#entityClass").val()
			entityList[position].Initiative = $("#entityInit").val()
			entityList[position].IMG = $("#entityImage").val()
			console.log("value = " + $('input[name=entityType]:checked').val())
			entityList[position].Type = $('input[name=entityType]:checked').val()
		}
		drawEntityList();
		$('#editEntityModal').modal('hide')
    });

function removeEntity(entity)
{
	if(confirm("Yar, this character be dead and gone then?"))
	{
		var position = entityList.indexOfField("GUID", $(entity).data("charid"))
		entityList.splice(position, 1);
		drawEntityList();
	}
}

function drawEntityList()
{
	entityList.sort(function (a,b) { return b.Initiative - a.Initiative})
	$("#entity-list-div").empty();
	// Loop over entity list
	$.each(entityList, function(i, val) {
		if(val.Name == "")
			return true;
		$char = $("#characterBlockToClone").clone();
		
		$char.find("img").attr("src", val.IMG);
		$char.find(".character-name").text(val.Name).data("charid", val.GUID);
		$char.find(".character-init").text(val.Initiative);
		$char.find(".character-hp").text(val.HP);
		
		if(val.HP > (val.MaxHP / 2))
			$char.find(".character-hp").parent().addClass("btn-success");
		else if(val.HP < (val.MaxHP / 2))
			$char.find(".character-hp").parent().addClass("btn-warning");
		else
			$char.find(".character-hp").parent().addClass("btn-danger");
		
		$char.find(".character-class").text(val.Class);
		if(val.Type == "Friendly")
			$char.find(".character-name").addClass("btn btn-primary btn-lg");
		else if(val.Type == "Neutral")
			$char.find(".character-name").addClass("btn btn-warning btn-lg");
		else
			$char.find(".character-name").addClass("btn btn-danger btn-lg");
		
		
		$char.find(".removeButton").data("charid", val.GUID);
		$char.find(".healButton").data("charid", val.GUID);
		$char.find(".damageButton").data("charid", val.GUID);
		//btn btn-primary btn-lg
		
		var effectsText = ""
		// update effects
		$.each(val.Effects, function(x, y) {
			effectsText = effectsText + y.Name + ' ('+y.Duration+' rounds) ';
		})
		$char.find(".character-effects").text(effectsText);
		$char.show();
		$char.attr("id", val.GUID);
		// append to entity list
		$char.appendTo("#entity-list-div")
	});
}



Array.prototype.indexOfField = function (propertyName, value) {
        for (var i = 0; i < this.length; i++)
            if (this[i][propertyName] === value)
                return i;
        return -1;
    }