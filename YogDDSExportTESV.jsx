// SCRIPT NAME: YogDDSExport
// AUTHOR: Yogensia
// COPYRIGHT: Yogensia
// LICENSE: MIT
// DESCRIPTION: Makes it quicker to save DDS files for Fallout 4 textures.

// This script is based on VTools by James A. Taylor
// http://polycount.com/discussion/49192/vtools-scripts-for-photoshop/
//
// This script requires Intel® Texture Works DDS plugin (NVIDIA's plugin doesn't
// support the compression formats we need like BC5).
//
// The Presets included with this script are also required for it to function
// properly! Make sure to check installation notes in the readme file for more
// details.



/**
 * Variables and setup
 */

// setup
var VERSION = 0.1;
var DEBUG = false;
var thepsd, thepath, psdname, thedds, ddsname, ddspath, namelayer, ddssuffix, alphaChan;

// focus on Photoshop
#target photoshop
app.bringToFront();

// initiate script code
init();



/**
 * Debug function to show info
 * @param  string  desc  description of debug value
 * @param  any  val  result of the debug check
 */
function debug(desc, val) {
	if (DEBUG == true) { alert(desc + ': ' + val, 'DEBUG MESSAGE') }
}



/**
 * Where everything starts
 */
function init()
{
	// we need an open document first!
	if (documents.length <= 0)
	{
		alert("Error:\n\nSorry, this script requires an open PSD document to work with.", "ERROR");
		return;
	}

	// store the default setting that may be affected
	var myunit = preferences.rulerUnits;

	// set the current preference to be pixels
	preferences.rulerUnits = Units.PIXELS;

	// set psdname to the currently active documents name
	psdname = activeDocument.name;

	// set thepsd to the currently active document
	thepsd = activeDocument;

	// store the number of alpha channels
	alphaChan = thepsd.channels.length - 3;
	debug('alphas found', alphaChan);

	// find layers that need to be exported
	checklayers();

	// now restore the default settings
	preferences.rulerUnits = myunit;

	activeDocument=thepsd;
}



/**
 * Check the first level layer names for textures to export
 */
function checklayers()
{
	// set up a storage array for the tidle marked layersets
	var tsets = new Array();

	//set up an array of those T layersets that are currently visible
	//this is so we can restore the PSD to the state it was when we entered the script later
	//we don't need a list of layersets not visible, since if they're not visible, their visibility is already where it should be.
	var vsets = new Array();

	//set up a storage array for those layers that are both visible and marked, so we can append an initial just to the current set.
	// yes, it's an amusing variable name too!
	var tvsets = new Array();
	i=(thepsd.layerSets.length-1);
	if (i == -1)
	{
		alert("Error:\n\nThis document does not have any layer groups!\nCreate at least one layer group named ~_d, ~_s, ~_n or ~_g.","ERROR");
		return;
	}

	// loop until the count of i is the same as the number of layersets
	while (i != -1)
	{

		// define the current layerset (as number i) as "namelayer"
		namelayer=thepsd.layerSets[i];

		// check if the layer is visible, if it is, add its index to the visible list
		if (namelayer.visible==true) vsets[vsets.length]=i;

		// search the layers name for the "~" symbol
		var tiset = namelayer.name.indexOf("~");

		// if the ~ symbol was found as the first character
		// set the last entry in the tsets array to be i (the current layerset index)
		if (tiset == 0)
			{
			tsets[tsets.length]=i;
			//check to see if it's visible (again), if it is then hide it (so we don't have any ~ marked sets visible to begin)
			if (namelayer.visible==true)
				{
				namelayer.visible=false;
				//also, add the current layer number to tvsets, as we know it was marked, and it was visible when the script was run.
				tvsets[tvsets.length]=i;
				}
			}
		// reduce i by 1
		i--;
	}

	// if there are no layers marked with a ~ then return
	if (tsets.length<1)
	{
		alert("Error:\n\nThis document does not have any layer groups to work with!\nCreate at least one layer group named ~_d, ~_s, ~_n or ~_g.","ERROR");
		return;
	}

	// set i to be the number of tilde layers found
	i=tsets.length-1;

	//loop until i = -1
	while (i != -1)
	{
		//store the current tilde layer number for this loop in tempstore, or store the highest previously visible one, depending on sets options
		tempstore=tsets[i];

		// set namelayer to be the current loop's tilde layer, and then make it visible.
		namelayer = thepsd.layerSets[tempstore];
		namelayer.visible=true;

		// get filename for the dds
		filename();

		// save things
		savedds();

		// hide the layer again
		namelayer.visible=false;

		// reduce i by 1
		i--;
	}

	//now to return the layersets' visibility to the same as we started with.
	//set i to be the number of originally visible layers
	i=vsets.length-1;
	while (i != -1)
	{
		namelayer=thepsd.layerSets[vsets[i]];
		namelayer.visible=true;
		i--;
	}
}



/**
 * Generates filenames for the DDS files based on PSD document path,
 * filename, and layer suffix
 */
function filename()
{

	// set ddsname to the currently active document
	ddsname = psdname;

	// remove the file extension
	var ddsnametemp = ddsname.indexOf(".psd");

	// if .psd not found we are not working on a PSD file, abort!
	if (ddsnametemp == -1)
	{
		alert("Error:\n\nPlease save as PSD first!\nThe filename/path of the PSD will be used to name your DDS files.", "ERROR");
		return;
	}

	// replace the .psd with .dds
	ddsname = ddsname.substring(0, ddsnametemp);

	ddssuffix = namelayer.name.substring(1, 3);

	ddsname = ddsname + ddssuffix + ".dds";

	thepath = thepsd.path;
	ddspath = File(thepath + "/" + ddsname);
}


/**
 * Save the DDS file using Intel's DDS plugin and the file format required for the texture
 */
function savedds(ddsformat)
{
	// Handle export presets, depending on the suffix
	// Supported presets:
	// Fallout Color (BC1)
	// Fallout Color + Alpha (BC3)
	if (ddssuffix == '_n') {
		// if the PSD has an alpha channel, save it in the normal DDS
		if (alphaChan == 0) {
			var ddsformat = "Fallout Color (BC1)";
		} else {
			var ddsformat = "Fallout Color + Alpha (BC3)";
		}
	}	else {
		var ddsformat = "Fallout Color (BC1)";
	}

	// scriptinglistener output for saving a file as copy with the Intel® Texture Works plugin
	var idsave = charIDToTypeID( "save" );
	var desc135 = new ActionDescriptor();
	var idAs = charIDToTypeID( "As  " );
	var desc136 = new ActionDescriptor();
	var idpres = charIDToTypeID( "pres" );
	desc136.putString( idpres, ddsformat );
	var idIntelTextureWorksIntelTextureWorks = stringIDToTypeID( "Intel® Texture Works Intel® Texture Works" );
	desc135.putObject( idAs, idIntelTextureWorksIntelTextureWorks, desc136 );
	var idIn = charIDToTypeID( "In  " );
	desc135.putPath( idIn, new File( ddspath ) );
	var idDocI = charIDToTypeID( "DocI" );
	desc135.putInteger( idDocI, 1767 );
	var idCpy = charIDToTypeID( "Cpy " );
	desc135.putBoolean( idCpy, true );
	var idsaveStage = stringIDToTypeID( "saveStage" );
	var idsaveStageType = stringIDToTypeID( "saveStageType" );
	var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
	desc135.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
	executeAction( idsave, desc135, DialogModes.NO );

	debug("Exported", ddsname);
}