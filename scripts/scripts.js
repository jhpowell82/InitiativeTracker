var combatList = [];
combatList.push({GUID: guid(), Name: "Bellagar", HP: 14, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
combatList.push({GUID: guid(), Name: "Mathias", HP: 12, Initiative: 3, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "DelSordaCool", HP: 25, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Makayla", HP: 20, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Auldous", HP: 20, Initiative: 7, IMG: "", Effects: []});
combatList.push({GUID: guid(), Name: "Stephanie", HP: 20, Initiative: 7, IMG: "", Effects: []});

var explorationList = [];
explorationList.push({GUID: guid(), Name: "Bellagar", HP: 11, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
explorationList.push({GUID: guid(), Name: "Mathias", HP: 11, Initiative: 3, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "DelSordaCool", HP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Makayla", HP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Auldous", HP: 21, Initiative: 7, IMG: "", Effects: []});
explorationList.push({GUID: guid(), Name: "Stephanie", HP: 21, Initiative: 7, IMG: "", Effects: []});

var interactionList = [];
interactionList.push({GUID: guid(), Name: "Bellagar", HP: 12, Initiative: 5, IMG: "https://pixabay.com/static/uploads/photo/2015/08/31/17/00/sword-915735_960_720.png", Effects: [{Name: "Disoriented", Duration: 1}]});
interactionList.push({GUID: guid(), Name: "Mathias", HP: 12, Initiative: 3, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "DelSordaCool", HP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Makayla", HP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Auldous", HP: 22, Initiative: 7, IMG: "", Effects: []});
interactionList.push({GUID: guid(), Name: "Stephanie", HP: 22, Initiative: 7, IMG: "", Effects: []});


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

$('#editEntityModal').on('show.bs.modal', function (event) {
  var trigger = $(event.relatedTarget) // Button that triggered the modal
  // We are editing an existing character
  if(trigger.data('charid'))
  {
	  // Find entry in array
	  var position = entityList.indexOfField("GUID", trigger.data('charid'))
	  console.log(entityList[position])
	  if(position != -1)
	  {
		$("#entityName").val(entityList[position].Name)
		$("#entityHP").val(entityList[position].HP)
		$("#entityInit").val(entityList[position].Initiative)
		$("#entityImage").val(entityList[position].IMG)
		$("#entityGUID").val(entityList[position].GUID)
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
		$("#entityInit").val("")
		$("#entityImage").val("")
		$("#entityGUID").val(id)
  }
  console.log(trigger.data('charid'));
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
})

// Update items
$("#saveModalChanges").click(function(){
		var position = entityList.indexOfField("GUID", $("#entityGUID").val())
		if(position != -1)
		{
			entityList[position].Name = $("#entityName").val()
			entityList[position].HP = $("#entityHP").val()
			entityList[position].Initiative = $("#entityInit").val()
			entityList[position].IMG = $("#entityImage").val()
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
		
		// update image
		$char.find("img").attr("src", val.IMG);
		
		// update name 
		$char.find(".character-name").text(val.Name).data("charid", val.GUID);
		
		$char.find(".removeButton").data("charid", val.GUID);
		
		// update init 
		$char.find(".character-init").text(val.Initiative);
		
		// update hp
		$char.find(".character-hp").text(val.HP);
		
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