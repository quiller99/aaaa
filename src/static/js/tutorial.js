
// ############
//    STEP 1
// ############

/*
// ############
//    STEP 14
// ############
*/
$('[id=reason]').on('click', function(e){
	
	var query = $('#query14').val();
	var endpoint = 'http://localhost:5820/Wine/query';
	var format = 'JSON', reasoning;
	switch($(this).html()) {
		case "Reasoning OFF":
			reasoning = false;
			break;
		case "Reasoning ON":
			reasoning = true;
			break;
		default:
			reasoning = false;
			break;
	}
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(json){
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
					
					v_value = v_value.replace('http://www.semanticweb.org/quinten/ontologies/2015/8/untitled-ontology-6#','')
				
					li.append('<strong>'+v+'</strong>		');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/><br>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget14').html(ul);
		} catch(err) {
			$('#linktarget14').html(err);
		}
		
		
	});
	
});