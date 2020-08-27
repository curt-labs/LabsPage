var REQUIRED_JQUERY = 1.6;
var STORAGE = true,
		USER_AGENT = navigator.userAgent.toLowerCase(),
		clearHTML,
		mountHTML,
		yearHTML,
		makeHTML,
		modelHTML,
		styleHTML,
		loaderHTML,
		clearHTML,
		inputHTML,
		resultHTML = '',
		vehicleStr,
		logoImg = '',
		buyNow = false,
		wiring = false,
		accessories = false,
		preloaded = false,
		facebox = true,
		merchant_id = 0,
		customer_id = 0,
		customer_email = '',
		mount = '',
		year = '',
		make = '',
		model = '',
		style = '',
		partID = '',
		checkout = 'google',
		integrated = false,
		cart_link = '',
		jQueryScriptOutputted = false,
		widget_loaded = false,
		protocol = window.location.protocol;

init();
initWidget();

function isHttps(){
		return window.location.protocol = 'https';
}

function init(){
		var declaredStyle;
		if(document.createStyleSheet) {
				/* Get the declared stylesheet */

				var dataStyle = document.getElementById('configurator').getAttribute('data-lookupstyle');
				if (dataStyle !== null && dataStyle !== ''){
					// Make sure we have a style attribute
					declaredStyle = dataStyle
					document.createStyleSheet('https://labs.curtmfg.com/widget_v2/css/'+ dataStyle +'.css');
				}else{
					// Make sure we have a style attribute
					declaredStyle = document.getElementById('configurator').getAttribute('lookupstyle');
					declaredStyle = (declaredStyle === null)?'default':declaredStyle;
					document.createStyleSheet('https://labs.curtmfg.com/widget_v2/css/'+ declaredStyle +'.css');
				}

		}else{

				/* Get the declared stylesheet */

				var dataStyle = document.getElementById('configurator').getAttribute('data-lookupstyle');
				if (dataStyle !== null && dataStyle !== ''){
					// Make sure we have a style attribute
					declaredStyle = dataStyle;
				}else{
					// Make sure we have a style attribute
					declaredStyle = document.getElementById('configurator').getAttribute('lookupstyle');
					declaredStyle = (declaredStyle === null)?'default':declaredStyle;
				}


				// Load configurator stylesheet
				var styles = "@import url('https://labs.curtmfg.com/widget_v2/css/" + declaredStyle +".css');";
				//var styles = "@import url('file://localhost/Users/alexninneman/Sites/HitchWidget/" + declaredStyle +".css');";
				var newSS=document.createElement('link');
				newSS.rel='stylesheet';
				newSS.href='data:text/css,'+escape(styles);
				document.getElementsByTagName("head")[0].appendChild(newSS);

		}
}

function initWidget(){

if(!widget_loaded){

						// Create function for getting the URL GET data
						jQuery.extend({

								// This function will return all of the GET data inside the 'vars' array
								getUrlVars: function(){
										var vars = [], hash;
										var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
										jQuery.each(hashes,function(i, hash){
												hash = hashes[i].split('=');
												vars.push(hash[0]);
												vars[hash[0]] = hash[1];
										});
										return vars;
								},

								// This function will return the GET variable declared in the 'name' variable
								// @param : GET variable name to be retrieved
								getUrlVar: function(name){
										var hashes = jQuery.getUrlVars();
										if(hashes !== undefined && hashes[name] !== undefined){
												return hashes[name];
										}else{
												return '';
										}
								}
						});

						jQuery.fn.sort = function() {
								return this.pushStack( [].sort.apply( this, arguments ), []);
						};

						jQuery('#mount').on('change',function(){
										mount = jQuery(this).val();
										jQuery('#configurator label').remove();
										jQuery('#loader').show();
										var get_data = {
												mount: mount,
												dataType:'jsonp'
										};
										jQuery.get('https://api.curtmfg.com/v2/GetYear?callback=loadYears',get_data,function(years){},'jsonp');
										if(mount == 'rear'){
												jQuery('#searchStr').text('Rear Mount');
										}else{
												jQuery('#searchStr').text('Front Mount');
										}
										jQuery('#clear').show();
						});

						jQuery('label[for=year] #year').on('change',function(){
										year = jQuery(this).val();
										jQuery('#configurator label').remove();
										jQuery('#loader').show();
										var get_data = {
												mount: mount,
												year: year,
												dataType: 'jsonp'
										};
										jQuery.get('https://api.curtmfg.com/v2/GetMake?callback=loadMakes',get_data,function(makes){},'jsonp');
										var str = jQuery('#searchStr').text();
										jQuery('#searchStr').text(str + ' ' + year);
										jQuery('#clear').show();
						});

						jQuery('#make').on('change',function(){
										make = jQuery(this).val();
										jQuery('#configurator label').remove();
										jQuery('#loader').show();
										var get_data = {
												 mount: mount,
												 year: year,
												 make: make,
												 dataType:'JSONP'
										};
										jQuery.get('https://api.curtmfg.com/v2/GetModel?callback=loadModels',get_data,function(models){},'jsonp');
										var str = jQuery('#searchStr').text();
										jQuery('#searchStr').text(str + ' ' + make);
						});

						jQuery('#model').on('change',function(){
										model = jQuery(this).val();
										jQuery('#configurator label').remove();
										jQuery('#loader').show();
										var get_data = {
											mount: mount,
											year: year,
											make: make,
											model: model,
											dataType:'JSONP'
										};
										jQuery.get('https://api.curtmfg.com/v2/GetStyle?callback=loadCurtStyles',get_data,function(styles){},'jsonp');
										var str = jQuery('#searchStr').text();
										jQuery('#searchStr').text(str + ' ' + model);
						});

						jQuery('#style').on('change',function(){
							jQuery('#lookup_submit').show();
						});

						jQuery('#lookup_submit').on('click',function(){
								if(jQuery('#style').get().length !== 0 && jQuery('#style').val() != style && jQuery('#style').val().length > 0){
										jQuery('#hitchResults').html('');
										jQuery(this).hide();
										jQuery('#clear').hide();
										style = jQuery('#style').val();
										//jQuery('#style').remove();
										jQuery('#configurator label').remove();
										jQuery('#loader').show();
										var get_data = {
											year: year,
											make: make,
											model: model,
											style: style,
											dataType: 'jsonp',
											integrated: integrated,
											cust_id: customer_id
										};
										jQuery.get('https://api.curtmfg.com/v2/GetParts?callback=loadParts',get_data,function(parts){},'jsonp');
								}
							return false;
						});

						jQuery('#clear').on('click',function(){
							clearWidget();
						});

						jQuery('ul.tabs li a').on('click',function(){
																				jQuery('ul.tabs li a').removeClass('active');
																				jQuery(this).addClass('active');
																				jQuery('.widget_tab_content').hide();
																				var part_class = jQuery(this).attr('title');
																				jQuery('#'+part_class).show();
						});
						widget_loaded = true;
						loadConfigurator();
				}
}

function clearWidget(){
	jQuery('#hitchResults').html('').hide();
	jQuery('#searchStr').text('');
	jQuery('#clear').hide();
	jQuery('#configurator').find('label').remove();
	jQuery('#configurator').append(mountHTML);
	jQuery('label[for=mount]').show();
	jQuery('#mount').show();
	jQuery('#loader').before(mountHTML);
	jQuery('#lookup_submit').hide();
}

function sortByClass(a,b){
		 if (a.pClass == b.pClass){
			 return 0;
		 }
		 return a.pClass > b.pClass ? 1 : -1;
 }

function loadConfigurator(){

		// Make sure we have a configurator
		if(jQuery('#configurator').length > 0){
				// Display the configurator
				jQuery('#configurator').css('display','block');

				// Create  element to store the vehicle string
				cleanHTML = '<span id="searchStr">&nbsp;</span>';
				jQuery('#configurator').append(cleanHTML);
				jQuery('#searchStr').css('display','block');

				// Add the mount select box
				mountHTML = '<label for="mount"><select name="mount" id="mount">';
				mountHTML += '<option value="">- Select Mount -</option>';
				mountHTML += '<option value="front">Front Mount</option>';
				mountHTML += '<option value="rear">Rear Mount</option>';
				mountHTML += '</select></label>';

				jQuery('#configurator').append(mountHTML);
				jQuery('#mount').css('display','block');

				// Add the year select box
				yearHTML = '<label for="year"><select name="year" id="year">';
				yearHTML += '<option value="0">- Select Year - </option>';
				yearHTML += '</select></label>';

				// Add the make select box
				makeHTML = '<label for="make"><select name="make" id="make">';
				makeHTML += '<option value="0">- Select Make -</option>';
				makeHTML += '</select></label>';

				// Add the model select box
				modelHTML = '<label for="model"><select name="model" id="model">';
				modelHTML += '<option value="0">- Select Model -</option>';
				modelHTML += '</select></label>';

				// Add the model select box
				styleHTML = '<label for="style"><select name="style" id="style">';
				styleHTML += '<option value="0">- Select Style -</option>';
				styleHTML += '</select></label>';

				// We need to create our loading GIF for transition on AJAX calls
				loaderHTML = "<img src='https://labs.curtmfg.com/widget_v2/img/ajax-loader.gif' id='loader' style='display:none' width='208' height='25' />";
				jQuery('#configurator').append(loaderHTML);

				// Create our submit button
				// This won't be displayed until the user selects a style
				inputHTML = '<div class="hold"></div><input type="button" id="lookup_submit" name="lookup_submit" value="Find Hitch" />';
				jQuery('#configurator').append(inputHTML);

				// Create link to use as a 'Clear' action on the search results and vehicle string
				clearHTML = '<a href="javascript:void(0)" style="display:none;" id="clear">Clear</a>';
				jQuery('#configurator').append(clearHTML);

				if(jQuery('#hitchResults').get().length === 0){
						resultHTML = '<div id="hitchResults"></div>';
						jQuery('#configurator').append(resultHTML);
				}
				jQuery('#configurator').after('<div style="clear:both"></div>');
				jQuery('#hitchResults').hide();

				// Check if the user has defined a logo and store it if they have
				if(jQuery('#configurator').attr('logo') !== null && jQuery('#configurator').attr('logo') !== ''){
						logoImg = jQuery.trim(jQuery('#configurator').attr('logo'));
				}else{
						logoImg = '';
				}

				// Check if we want to display the Buy Now link
				if(jQuery('#configurator').attr('buyNow')){
						buyNow = jQuery('#configurator').attr('buyNow');
						merchant_id = jQuery('#configurator').attr('merchant_id');

						// Check which checkout platform we are going to run
						if(!jQuery('#configurator').attr('checkout')){
								// No checkout platform determined
								buyNow = false;
								merchant_id = 0;
						}else{
								checkout = jQuery('#configurator').attr('checkout');
						}
				}
				if(jQuery('#configurator').data('buynow')){
						buyNow = jQuery('#configurator').data('buynow');
						merchant_id = jQuery('#configurator').data('merchant_id');

						// Check which checkout platform we are going to run
						if(!jQuery('#configurator').data('checkout')){
								// No checkout platform determined
								buyNow = false;
								merchant_id = 0;
						}else{
								checkout = jQuery('#configurator').data('checkout');
						}
				}

				// Check if we want to bring wiring results with the hitch
				if(jQuery('#configurator').attr('wiring')){
						if(jQuery('#configurator').attr('wiring') == 'true'){
								wiring = true;
						}
				}
				if(jQuery('#configurator').data('wiring')){
						if(jQuery('#configurator').data('wiring') == 'true'){
								wiring = true;
						}
				}

				// Check if we want to bring the accessories of a hitch into the hitch details pane
				if(jQuery('#configurator').attr('accessories')){
						if(jQuery('#configurator').attr('accessories') == 'true'){
								accessories = true;
						}
				}
				if(jQuery('#configurator').data('accessories')){
						if(jQuery('#configurator').data('accessories') == 'true'){
								accessories = true;
						}
				}

				// Check if we want to integrate with the customer's cart id's
				if(jQuery('#configurator').attr('integrated')){
						if(jQuery('#configurator').attr('integrated') == 'true'){
								integrated = true;
						}
				}
				if(jQuery('#configurator').data('integrated')){
						if(jQuery('#configurator').data('integrated') == 'true'){
								integrated = true;
						}
				}

				// Get the customer id
				if(jQuery('#configurator').attr('customer_id')){
						customer_id = jQuery('#configurator').attr('customer_id');
				}
				if(jQuery('#configurator').data('customer_id')){
						customer_id = jQuery('#configurator').data('customer_id');
				}

				// Get the customer name
				if(jQuery('#configurator').attr('customer_email')){
						customer_email = jQuery('#configurator').attr('customer_email');
				}
				if(jQuery('#configurator').data('customer_email')){
						customer_email = jQuery('#configurator').data('customer_email');
				}

				// Get the path to the users shopping cart
				if(jQuery('#configurator').attr('cart_path')){
						cart_link = jQuery('#configurator').attr('cart_path');
				}
				if(jQuery('#configurator').data('cart_path')){
						cart_link = jQuery('#configurator').data('cart_path');
				}

				// Handle the image swap from little image to big image
				jQuery('.mini').on('click',function(){
						// Get the clicked images source
						var miniSrc = jQuery(this).attr('src');
						// Get the big images source
						var bigSrc = jQuery('#mainImage img').attr('src');
						jQuery(this).attr('src',bigSrc);
						jQuery('#mainImage img').attr('src',miniSrc);
				});

				// Get our URL variables
				year = jQuery.getUrlVar('year');
				make = jQuery.getUrlVar('make');
				model = jQuery.getUrlVar('model');
				style = jQuery.getUrlVar('style');
				partID = jQuery.getUrlVar('partID');

				// Add the tab effects
				jQuery('.tab_content').hide();
				jQuery('ul.tabs li:first').addClass('active').show();
				jQuery('.tab_content:first').show();

				// Handle the click event for our tabs
				jQuery('ul.tabs li').on('click',function(){
						jQuery('ul.tabs li').removeClass('active'); // Remove any 'active' class
						jQuery(this).addClass('active'); // Add 'active' class to selected tab
						jQuery('.tab_content').hide(); // Hide all tab content

						var activeTab = jQuery(this).find('a').attr('href'); // Find the id of the 'tab_content' that this link is referencing
						jQuery(activeTab).fadeIn(); // Fade in the active ID content
						return false;
				});

				jQuery('.hitchTabs').find('a').on('click',function(){
						jQuery(this).parent().parent().find('.hitchTab').removeClass('activeHitchTab');
						jQuery(this).parent().addClass('activeHitchTab');
						var tab = jQuery(this).attr('class');

						jQuery(this).parent().parent().next().find('.content').fadeOut();
						jQuery(this).parent().parent().next().find("."+tab+"_content").slideDown();
						return false;
				});

				jQuery('.imageTab_content img').on('click',function(){
						var imgSrc = jQuery(this).attr('src');
						imgSrc = imgSrc.replace('300x225','1024x768');
						window.open(imgSrc,'','resizeable=yes;toolbar=no;status=no');
				});

				jQuery('.prodImg').on('click',function(){
						var imgSrc = jQuery(this).find('img').attr('src');
						imgSrc = imgSrc.replace('300x225','1024x768');
						window.open(imgSrc,'','resizeable=yes;toolbar=no;status=no');
						return false;
				});

				if(partID > 0){
						showPart(partID);
				}else if(year.length > 0 && make.length > 0 && model.length > 0 && style.length > 0){
						year = decodeURIComponent(year);
						make = decodeURIComponent(make);
						model = decodeURIComponent(model);
						style = decodeURIComponent(style);
						var get_data = {
								year: year,
								make: make,
								model:model,
								style: style,
								cust_id: customer_id,
								integrated: integrated,
								dataType: 'jsonp'
						};
						jQuery.get('https://api.curtmfg.com/v2/GetParts?callback=loadParts',get_data,function(parts){},'jsonp');
				}

				// Now that everything is loaded, we can make the request to the CURT API to track the deployment
				var deplyed_location = window.location.hostname;
				jQuery.get('https://api.curtmfg.com/v2/AddDeployment?url='+deplyed_location,function(){},'jsonp');
		}
}

/*
 * This function will check a given library and see if it is the version that we are looking for
 */
function checkVersion(library){
		if(library == 'jquery'){
				var currentJS = parseFloat(jQuery.fn.jquery);
				if(currentJS < REQUIRED_JQUERY){
						return false;
				}else{
						return true;
				}
		}
		return false;
}

function showPart(partID){
		if(partID > 0){
				var get_data = {
						partID: partID,
						dataType: 'jsonp',
						integrated: integrated,
						cust_id: customer_id
				};
				jQuery.get('https://api.curtmfg.com/v2/GetPart?callback=loadSingle',get_data,function(part_result){},'jsonp');
		}
}

function loadYears(years){
		jQuery('#loader').after(yearHTML);
		jQuery.each(years,function(i,year){
				jQuery('#year').append('<option>'+year+'</option>');
		});
		jQuery('#loader').hide();
		jQuery('#year').show();
}

function loadMakes(makes){
		jQuery('#loader').after(makeHTML);
		jQuery.each(makes,function(i,make){
				jQuery('#make').append('<option>'+make+'</option>');
		});
		jQuery('#loader').hide();
		jQuery('#make').show();
}

function loadModels(models){
		jQuery('#loader').after(modelHTML);
		jQuery.each(models,function(i,model){
				jQuery('#model').append('<option>'+model+'</option>');
		});
		jQuery('#loader').hide();
		jQuery('#model').show();
}

function loadCurtStyles(styles){
		jQuery('#loader').after(styleHTML);
		jQuery.each(styles,function(i,style){
				jQuery('#style').append('<option>'+style+'</option>');
		});
		jQuery('#loader').hide();
		jQuery('#style').show();
}

/**
 * This function will take in the parts JSON object and a string depicting the class we want to retrieve parts for.
 *
 * @param parts - JSON object
 * @param class - string
 * returns Array()
 **/
function GetPartsForClass(parts, pClass){
		var arr = [];
		if(pClass != 'Other'){
				jQuery.each(parts,function(i,part){
						if(jQuery.trim(part.pClass) == pClass){
								arr.push(part);
						}
				});
		}else{
				jQuery.each(parts,function(i,part){
						if(jQuery.trim(part.pClass) === ""){
								arr.push(part);
						}
				});
		}

		return arr;
}

function loadParts(parts){
		vehicleStr = mount + ' ' + year + ' ' + make + ' ' + model + ' ' +style;
		vehicleStr.replace('rear', 'Rear Mount').replace('front','Front Mount');
		mount = year = make = model = style = '';
		if(parts !== null && parts.length > 0){
				var resultHTML = "";

				// We need to spool out the categories that the products are under.
				parts = jQuery(parts).sort(sortByClass);
				var class_array = [];
				var part_array = [];

				// Step through each part and populate an array of the unique product classes
				jQuery.each(parts,function(i,part){
						if(part.shortDesc.toUpperCase().indexOf('T-CONNECTOR',0) == -1 || part.shortDesc.toUpperCase().indexOf('WIRING',0) == -1){
								if(jQuery.inArray(jQuery.trim(part.pClass),class_array) == -1){
										if(jQuery.trim(part.pClass).length > 0){
												class_array.push(jQuery.trim(part.pClass));
										}else{ // There was a blank class returned, we need to populate this under the 'Other class'
												if(jQuery.inArray('Other', class_array) == -1){
														class_array.push('Other');
												}
										}
								}
						}
				});

				// Print out the different product classes
				if(class_array.length > 0){
						resultHTML += '<ul class="tabs">';
						jQuery.each(class_array,function(i,pClass){
								if(pClass !== undefined && pClass.length > 0){
										part_array[pClass] = GetPartsForClass(parts,pClass);
										resultHTML += '<li>';
												resultHTML += '<a href="#class'+i+'_content" title="'+pClass.replace(/ /g,'')+'">'+pClass+'</a>';
										resultHTML += '</li>';
								}
						});
						resultHTML += '</ul>';
				}
				resultHTML += '<div id="widget_tab_container">';
				jQuery.each(class_array,function(i,pClass){
						resultHTML += '<div class="widget_tab_content" id="'+pClass.replace(/ /g,'')+'">';
								resultHTML += '<div id="resultBox_outline">';
										resultHTML += '<div id="resultBox">';
												resultHTML += '<p id="vehicleStr">' + vehicleStr.replace('rear','Rear Mount').replace('front', 'Front Mount') + '</p>';
												if(logoImg !== ''){
														resultHTML += '<div id="logo">';
																resultHTML += '<img src="'+ logoImg +'" alt="Company Logo" />';
														resultHTML += '</div>';
												}

												// Print out the number of hitches found
												resultHTML += '<div style="clear:both"></div>';
												resultHTML += '<span>( <span id="hitchCount">'+part_array[pClass].length+'</span> ) products found.</span>';

										resultHTML += '</div>';
								resultHTML += '</div>';
								resultHTML += '<div style="clear:both"></div>';
								jQuery.each(part_array[pClass],function(i,part){
										if(part.shortDesc.toUpperCase().indexOf('T-CONNECTOR',0) == -1 || part.shortDesc.toUpperCase().indexOf('WIRING',0) == -1){
												resultHTML += displayPart(part);
										}
								});
						resultHTML += '</div>';
				});
				resultHTML += '</div>';
				jQuery('#hitchResults').html(resultHTML);
				jQuery('#hitchResults').show();

				jQuery('#loader').before(mountHTML);
				jQuery('#mount').show();
				jQuery('#searchStr').text('');

				// Fire off a request to find the wiring for this vehicle and load the tab
				displayWiring();

		}else{
				vehicleStr.replace('rear','Rear Mount').replace('front', 'Front Mount');
				jQuery('#hitchResults').html('<p id="vehicleStr">No results for ' + vehicleStr + '</p>');
		}


		jQuery('#loader').hide();
		jQuery('#hitchResults').show();
		jQuery('.widget_tab_content:first').show();
		jQuery('ul.tabs li:first a').addClass('active');

}

function loadSingle(part){
		if(part !== null){
				var resultHTML = "";

				// Print out the different product classes
				if(part.pClass.length > 0){
						resultHTML += '<ul class="tabs">';
								resultHTML += '<li>';
										resultHTML += '<a href="#class1_content" title="'+part.pClass.replace(/ /g,'')+'">'+part.pClass+'</a>';
								resultHTML += '</li>';
						resultHTML += '</ul>';
				}
				resultHTML += '<div id="widget_tab_container">';
						resultHTML += '<div class="widget_tab_content" id="'+part.pClass.replace(/ /g,'')+'">';
								resultHTML += displayPart(part);
						resultHTML += '</div>';
				resultHTML += '</div>';
				jQuery('#hitchResults').html(resultHTML);
				jQuery('#hitchResults').show();

				jQuery('#loader').before(mountHTML);
				jQuery('#mount').show();
				jQuery('#searchStr').text('');

				jQuery('.widget_tab_content:first').show();
				jQuery('ul.tabs li:first a').addClass('active');

				// Fire off a request to find the wiring for this vehicle and load the tab
				displayWiring();

		}else{
				jQuery('#hitchResults').html('<p id="vehicleStr">No results</p>');
		}


}

function displayPart(part){
		// Begin Compiling HTML
		var shortDesc = part.shortDesc.replace("CURT ","");
		var partHTML = "<div class='hitch'>";
				partHTML += "<span class='shortDesc_link'>";
						partHTML += "<img class='curtLogo' src='https://labs.curtmfg.com/widget_v2/img/logo.png' width='80' style='display:inline' />";
						partHTML += "<span class='trademark'>&trade;</span>";
						partHTML += "<span class='hitchTitle'>" + shortDesc + "</span><br />";
				partHTML += "</span>";


				partHTML += "<p>Part #: <strong>" +part.partID + "</strong></p>";
				partHTML += "<a title='" + part.shortDesc + "' href='https://www.curtmfg.com/masterlibrary/"+ part.partID + "/images/" + part.partID + "_1024x768_a.jpg' class='image prodImg'>";
						partHTML += "<img src='https://www.curtmfg.com/masterlibrary/"+ part.partID + "/images/" + part.partID + "_300x225_a.jpg' onerror='jQuery(this).parent().remove();' />";
						partHTML += "<span>Click to Enlarge</span>";
				partHTML += "</a>";
				partHTML += "<div class='longDesc'>";
						partHTML += "<div class='hitchSpecs'>";
								partHTML += "<span><strong>"+part.pClass+"</strong></span><br />";
								partHTML += "<span><strong>Install Time:</strong> "+part.installTime+" minutes</span><br />";
								partHTML += "<img src='https://labs.curtmfg.com/widget_v2/img/file_pdf.png' />";

								if(part.pClass == "Wiring"){
									partHTML += "<a target='_blank' href='https://www.curtmfg.com/masterlibrary/"+part.partID+"/installsheet/CME_"+part.partID+"_INS.pdf'>";
								}else{
									partHTML += "<a target='_blank' href='https://www.curtmfg.com/masterlibrary/"+part.partID+"/installsheet/CM_"+part.partID+"_INS.pdf'>";
								}
								
								partHTML += "Instruction Sheet "+part.partID;
								partHTML += "</a>";
								if(part.attributes.length > 0){
										partHTML += "<table class='attribute_table'>";
										var attr_keys = [];
										jQuery.each(part.attributes,function(i, attribute){
												if(jQuery.inArray(attribute.key,attr_keys) == -1){
														partHTML += "<tr>";
																partHTML += "<td>"+attribute.key+"</td>";
																partHTML += "<td>"+attribute.value+"</td>";
														partHTML += "</tr>";
														attr_keys[i + 1] = attribute.key;
												}
										});
										partHTML += "</table>";
								}
								var content_values = [];
								jQuery.each(part.content,function(i, content_item){
										if(jQuery.inArray(content_item.value,content_values) == -1){
												if(content_item.key != 'installationSheet'){
														partHTML += "<p class='content_piece'>"+content_item.value+"</p>";
														content_values[i + 1] = content_item.value;
												}
										}
								});
						partHTML += "</div>";
				partHTML += "</div>";
				partHTML += "<div class='prodLinks'>";
						var cust_part = 0;
						if(part.custPartID !== null){
								cust_part = part.custPartID;
						}
						partHTML += loadCheckout(part.listPrice,part.shortDesc,cust_part, part.partID);
				partHTML += "</div>";
				partHTML += "<div style='clear:both'></div>";

				// Begin tabbed architecture
				partHTML += "<div class='hitchTabs'>";
						partHTML += "<div class='hitchTab imageTab activeHitchTab'>";
								partHTML += "<a href='"+window.location.href+"' class='imageTab' id='"+part.partID+"'>Images</a>";
						partHTML += "</div>";
						if(part.relatedCount > 0 && accessories){
								partHTML += "<div class='hitchTab accTab'>";
										partHTML += "<a href='"+window.location.href+"' class='accTab' id='"+ part.partID +"_accessories'>Accessories</a>";
								partHTML += "</div>";
						}
				partHTML += "</div>";
				partHTML += "<div class='hitchTab_container'>";
						partHTML += "<div class='imageTab_content content' id='"+part.partID+"_content'>";
								partHTML += "<img rel='facebox' src='https://www.curtmfg.com/masterlibrary/"+part.partID+"/images/"+part.partID+"_300x225_b.jpg' onerror='jQuery(this).remove()' />";
								partHTML += "<img src='https://wwww.curtmfg.com/masterlibrary/"+part.partID+"/images/"+part.partID+"_300x225_c.jpg' onerror='jQuery(this).remove()' />";
								partHTML += "<img src='https://www.curtmfg.com/masterlibrary/"+part.partID+"/images/"+part.partID+"_300x225_d.jpg' onerror='jQuery(this).remove()' />";
								partHTML += "<img src='https://www.curtmfg.com/masterlibrary/"+part.partID+"/images/"+part.partID+"_300x225_e.jpg' onerror='jQuery(this).remove()' />";
						partHTML += "</div>";
						if(part.relatedCount > 0 && accessories){
								partHTML += "<div class='accTab_content content' id='"+part.partID+"_accessories'>";
								GetAccessories(part.partID);
								partHTML += "</div>";
						}
				partHTML += "</div>";
		partHTML += "</div>";
		return partHTML;
}

// Load the accessories for the given partID
function GetAccessories(partID){
		var get_data = {
				partID: partID,
				dataType: 'jsonp',
				widget: true,
				integrated: integrated,
				cust_id: customer_id
		};
		jQuery.get('https://api.curtmfg.com/v2/GetRelatedParts?callback=loadAccessories',get_data,function(){},'jsonp');
}

// Load the accessories into the part listing
function loadAccessories(partID, related_parts){
		if(related_parts !== null && related_parts.length > 0 && partID > 0){
				var accHTML = "";
				jQuery.each(related_parts,function(i,acc){
						accHTML += '<div class="accessory">';

						// Display Accessory Image
						accHTML += '<div class="imgContainer">';
						accHTML += '<div class="imgBorder">';
						accHTML += '<img onerror="jQuery(this).parent().hide()" src="https://www.curtmfg.com/masterlibrary/'+acc.partID+'/images/'+acc.partID+'_300x225_a.jpg" />';
						accHTML += '</div>';

						if(buyNow){
								var cust_part = 0;
								if(acc.custPartID !== null){
										cust_part = acc.custPartID;
								}
								accHTML += loadCheckout(acc.listPrice,acc.shortDesc, cust_part, acc.partID);
						}
						accHTML += '</div>';

						// Display Accessory Specs
						accHTML += '<div class="specs">';
						accHTML += '<span style="display:block;font-weight: bold">'+ acc.shortDesc +'</span>';
						accHTML += '<div class="details">';

						accHTML += "<ul>";
						jQuery.each(acc.attributes,function(i, attr){
								accHTML += "<li><strong>"+attr.key+"</strong>: "+attr.value+"</li>";
						});
						accHTML += "</ul>";

						accHTML += '<div style="clear:both"></div>';
						accHTML += '</div>';
						accHTML += '<div style="clear:both"></div>';
						accHTML += '</div>';

						accHTML += '<div style="clear:both"></div>';
						accHTML += '</div>';

				});
				jQuery('.hitchTab_container').find('#'+partID+'_accessories').html(accHTML);
		}else if(partID > 0){ // No related parts were found for this part, so we'll hide the tab
				jQuery('.hitchTabs').find('#'+partID+'_accessories').parent().remove();
				jQuery('.hitchTab_container').find('#'+partID+'_accessories').remove();
		}
}


// Request vehicle information
function displayWiring(){
		var get_data = {
				year: year,
				make: make,
				model: model,
				style: style,
				dataType: 'jsonp',
				integrated: integrated,
				cust_id: customer_id
		};
		jQuery.get('https://api.curtmfg.com/v2/GetConnector?callback=loadVehicleRecord',get_data,function(){},'jsonp');
}

// Handle the response from API for vehicle record
function loadVehicleRecord(response){
		if(response.length > 0){
				jQuery('ul.tabs').append('<li><a href="#wiring" class="tab" title="Wiring">Wiring</a></li>');
				var resultHTML = '<div class="widget_tab_content" id="Wiring">';
						resultHTML += '<div id="resultBox_outline">';
								resultHTML += '<div id="resultBox">';
										resultHTML += '<p id="vehicleStr">' + vehicleStr + '</p>';
										if(logoImg !== ''){
												resultHTML += '<div id="logo">';
														resultHTML += '<img src="'+ logoImg +'" alt="Company Logo" />';
												resultHTML += '</div>';
										}

										// Print out the number of hitches found
										resultHTML += '<div style="clear:both"></div>';
										resultHTML += '<span>( <span id="hitchCount">'+response.length+'</span> ) hitches found.</span>';

								resultHTML += '</div>';
						resultHTML += '</div>';
						resultHTML += '<div style="clear:both"></div>';
						jQuery.each(response,function(i,connector){
								resultHTML += displayPart(connector);
						});
				resultHTML += '</div>';
				jQuery('#widget_tab_container').append(resultHTML);
		}
}



function loadCheckout(price,title, custPartID, partID){
		var checkoutHTML = '';
		switch(checkout){
				case 'google':
						if(merchant_id > 0){
								checkoutHTML += '<span class="price">'+price+'</span><br />';
								checkoutHTML += '<div class="product">';
								checkoutHTML += '<input type="hidden" class="product-title" value="'+title.replace('""',' inch').replace('"','')+'">';
								checkoutHTML += '<input type="hidden" class="product-price" value="'+price+'">';
								checkoutHTML += '<div class="googlecart-add-button" tabindex="0" role="button" title="Add to cart"></div>';
								checkoutHTML += '</div>';
						}
						break;

				// Load Paypal
				case 'paypal':
						if(merchant_id){
								checkoutHTML += '<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post">';
								checkoutHTML += '<div style="padding-top: 15px"><span class="price accPrice">'+ price +'</span><br />';
								checkoutHTML += '<label>Qty</label>';
								checkoutHTML += '<select name="quantity" style="min-width:40px;display:inline">';
								checkoutHTML += '<option>1</option>';
								checkoutHTML += '<option>2</option>';
								checkoutHTML += '<option>3</option>';
								checkoutHTML += '<option>4</option>';
								checkoutHTML += '<option>5</option>';
								checkoutHTML += '</select>';
								checkoutHTML += '</div>';
								checkoutHTML += '<input type="hidden" name="item_number" value="'+title.replace('""',' inch').replace('"','')+'" />';
								checkoutHTML += '<input type="hidden" name="cmd" value="_xclick" />';
								checkoutHTML += '<input type="hidden" name="no_note" value="1" />';
								checkoutHTML += '<input type="hidden" name="business" value="' + customer_email + '" />';
								checkoutHTML += '<input type="hidden" name="currency_code" value="USD" />';
								checkoutHTML += '<input type="hidden" name="return" value="'+window.location.href+'" />';
								checkoutHTML += '<input type="hidden" name="item_name" value="'+title.replace('""',' inch').replace('"','')+'" />';
								checkoutHTML += '<input type="hidden" name="amount" value="'+ price +'" />';
								checkoutHTML += '<input type="image" name="submit" src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" border="0" align="top" alt="Check out with PayPal" />';
								checkoutHTML += '</form>';
						}
						break;
				case 'american_rv':
						if(custPartID > 0){
								checkoutHTML += '<span class="price">'+price+'</span><br />';
								checkoutHTML += '<a href="https://www.americanrvcompany.com/add_cart.asp?quick=1&amp;item_id='+custPartID+'" title="Buy Now">';
								checkoutHTML += '<img src="https://labs.curtmfg.com/widget_v2/img/checkout.png" alt="Checkout" />';
								checkoutHTML += '</a><br />';
						}
						break;
				case 'nuera':
						var return_url = window.location.pathname;
						if(return_url.indexOf('?') != -1){
								return_url += '&partID=' + partID;
						}else{
								return_url += '?partID=' + partID;
						}
						if(cart_link === ''){
							cart_link = '/addtocart.aspx?returnurl='+return_url;
						}else{
							if(cart_link.indexOf('?') != -1){
								cart_link += '&returnurl=' + return_url;
							}else{
								cart_link += '?returnurl=' + return_url;
							}
						}
						checkoutHTML += '<span class="price"><span>Price:</span>'+ price + '</span>';
						checkoutHTML += '<form class="nuera" method="post" action="' + cart_link + '">';
						checkoutHTML += '<input name="VariantStyle" id="VariantStyle" type="hidden" value="0" />';
						checkoutHTML += '<input name="IsWishList" id="IsWishList" type="hidden" value="0" />';
						checkoutHTML += '<input name="IsGiftRegistry" id="IsGiftRegistry" type="hidden" value="0" />';
						checkoutHTML += '<input name="UpsellProducts" id="UpsellProducts" type="hidden" value="" />';
						checkoutHTML += '<input name="CartRecID" id="CartRecID" type="hidden" value="0" />';
						checkoutHTML += '<input name="ProductID" id="ProductID" type="hidden" value="' + custPartID + '" />';
						checkoutHTML += '<input name="VariantID" id="VariantID" type="hidden" value="0" />';
						checkoutHTML += '<small>Quantity:</small>';
						checkoutHTML += '<input name="Quantity" id="Quantity" type="text" value="1" size="3" maxlength="4" />';
						checkoutHTML += '<input type="submit" value="Add to Cart" />';
						checkoutHTML += '</form>';

						break;

				case 'fasttrackracks':
								checkoutHTML += '<form action="http://www.fasttrackracks.com/store/addtocart.aspx" method="post">';
										checkoutHTML += '<div style="padding-top:15px"><span class="price accPrice">'+price+'</span>';
												checkoutHTML += '<label>Qty</label>';
												checkoutHTML += '<select name="qty" style="min-width:40px;display:inline">';
														checkoutHTML += '<option>1</option>';
														checkoutHTML += '<option>2</option>';
														checkoutHTML += '<option>3</option>';
														checkoutHTML += '<option>4</option>';
														checkoutHTML += '<option>5</option>';
								checkoutHTML += '</select>';
										checkoutHTML += '</div>';
										checkoutHTML += '<input type="hidden" name="return" value="'+window.location+'" />';
										checkoutHTML += '<input type="hidden" name="imageurl" value="https://www.curtmfg.com/masterlibrary/'+partID+'/images/'+partID+'_300x225_a.jpg" />';
										checkoutHTML += '<input type="hidden" name="ItemNbr" value="'+title+'" />';
										checkoutHTML += '<input type="hidden" name="product" value="'+vehicleStr + ' ' + title +'" />';
										checkoutHTML += '<input type="hidden" name="notax" value="null" />';
										checkoutHTML += '<input type="hidden" name="price" value="'+price+'" />';
										checkoutHTML += '<input type="hidden" name="weight" value="null" />';
										checkoutHTML += '<input type="submit" name="submit" class="fasttrackracks_button" value="Buy Now" />';
										checkoutHTML += '</form>';
						break;

				case 'stowaway2':
								checkoutHTML += '<form action="http://www.stowaway2.com/store/addtocart.aspx" method="post">';
										checkoutHTML += '<div style="padding-top:15px"><span class="price accPrice">'+price+'</span>';
												checkoutHTML += '<label>Qty</label>';
												checkoutHTML += '<select name="qty" style="min-width:40px;display:inline">';
														checkoutHTML += '<option>1</option>';
														checkoutHTML += '<option>2</option>';
														checkoutHTML += '<option>3</option>';
														checkoutHTML += '<option>4</option>';
														checkoutHTML += '<option>5</option>';
								checkoutHTML += '</select>';
										checkoutHTML += '</div>';
										checkoutHTML += '<input type="hidden" name="return" value="'+window.location+'" />';
										checkoutHTML += '<input type="hidden" name="imageurl" value="https://www.curtmfg.com/masterlibrary/'+partID+'/images/'+partID+'_300x225_a.jpg" />';
										checkoutHTML += '<input type="hidden" name="ItemNbr" value="'+title+'" />';
										checkoutHTML += '<input type="hidden" name="product" value="'+vehicleStr + ' ' + title +'" />';
										checkoutHTML += '<input type="hidden" name="notax" value="null" />';
										checkoutHTML += '<input type="hidden" name="price" value="'+price+'" />';
										checkoutHTML += '<input type="hidden" name="weight" value="null" />';
										checkoutHTML += '<input type="submit" name="submit" class="fasttrackracks_button" value="Buy Now" />';
										checkoutHTML += '</form>';
						break;
				case 'trailerhitches2go':
						checkoutHTML += '<span class="price">' + price + '</span>';
						checkoutHTML += '<button type="button" title="Add to Cart" class="button btn-cart" onclick="setLocation(';
						checkoutHTML += "'http://www.trailerhitches2go.com/mag/index.php/checkout/cart/add/uenc/aHR0cDovL3d3dy50cmFpbGVyaGl0Y2hlczJnby5jb20vbWFnL2VsZWN0cmljYWwvdC1jb25uZWN0b3JzLmh0bWw,/product/" + custPartID;
						checkoutHTML += '/\')"><span><span>Add to Cart</span></span>';
						checkoutHTML += '</button>';
						break;
				case 'rackwarehouse':
					checkoutHTML += '<span class="price">'+price+'</span><br />';
					checkoutHTML += '<a href="http://fitguides.rackwarehouse.com/yahoo/FitGuideCart.aspx?p1='+partID+',1" title="Buy Now">';
					checkoutHTML += '<img src="https://labs.curtmfg.com/widget_v2/img/checkout.png" alt="checkout" />';
					checkoutHTML += '</a><br />';
					break;
				case 'easternmarine':
					checkoutHTML += '<span class="stock">Stock #'+custPartID+'CM</span>';
					checkoutHTML += '<span class="price">'+price+'</span><br />';
					checkoutHTML += '<a href="'+cart_link.replace('[part_id]',custPartID)+'" title="Add to Cart" class="form-button">Add to Cart</a><br />';
					checkoutHTML += '</a><br />';
					break;
				case 'custom':
						if(cart_link.length > 0){
								checkoutHTML += '<span class="stock">'+price+'</span><br />';
								checkoutHTML += '<a href="'+cart_link.replace('[part_id]',custPartID)+'" title="Buy Now">';
								checkoutHTML += '<img src="https://labs.curtmfg.com/widget_v2/img/checkout.png" alt="checkout" />';
								checkoutHTML += '</a><br />';
						}else{
								checkoutHTML += '<a href="javascript:void()" title="Buy Now" class="tiretown" id="'+custPartID+'">';
								checkoutHTML += '<img src="https://labs.curtmfg.com/widget_v2/img/checkout.png" alt="checkout" />';
								checkoutHTML += '</a><br />';
						}
						break;
		}
		return checkoutHTML;
}
