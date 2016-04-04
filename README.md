# YogDDSExport v0.1

## About

**YogDDSExport** is a script for Photoshop writen in JavaScript that makes it faster to export DDS files for Fallout 4.

It's based on VTools but it's much more limited in features, since it's designed just for Fallout 4.

**This is how you use it:**

1. Organize the textures in layer groups inside your PSD file, using the usual suffixes preceeded by a tilde, Ex: a group named `~_d` for diffuse, one named `~_s` for specullar/gloss, one named `~_n` for normal map, etc.
2. When you execute it, the script will check those layer groups and export the ones marked with tildes to DDS files.

[You can see it in video here](https://dl.dropboxusercontent.com/u/251256/ShareX/2016-04-04_05-12-59.mp4).

**Advantages:**

- It's a lot faster than saving each texture manually. Save dialogs are taken care of, so saving is as fast as your PC can do it.
- Naming is done automatically using the names of the layer groups. If your PSD is called pistol.psd, the script will generate `pistol_d.dds`, `pistol_s.dds` & `pistol_n.dds`, and save them for you in the same folder as the PSD file.
- DDS compression formats are handled by the script as well. It will save diffuse and glow maps as BC1 (DXT1)/BC3 (DXT5), and specular/gloss mask or normalmaps as BC5, just like the original textures of the game.
- If your PSD has an alpha channel in the channels panel, it will be saved with your diffuse map.

## Requirements

YogDDSExport has only been tested in Photoshop CC 2015, but it should work in CS6 or above versions.

YogDDSExport requires **[Intel® Texture Works Plugin for Photoshop](https://software.intel.com/en-us/articles/intel-texture-works-plugin)** to write DDS files.

NVIDIA's DDS plugin is not supported since it's considerably outdated and can't work with BC5 and similar compression formats.

## Download

**[You can download YogDDSExport from this link](https://github.com/yogensia/YogDDSExport/archive/master.zip)**.

## Install

1. Make sure you have installed the [Intel® Texture Works Plugin for Photoshop](https://software.intel.com/en-us/articles/intel-texture-works-plugin) and run photoshop at least once.
2. Extract YogDDSExport.jsx file to `C:\Program Files\Adobe\Adobe Photoshop CC 2015\Presets\Scripts`.
3. Extract the preset files to `C:\Users\YourName\AppData\Local\Intel\PhotoshopDDSPlugin`
4. Restart Photoshop if it was already open.

**Note:** The AppData directory is hidden by default in Windows. If you have trouble opening it, open the start menu, type `%userprofile%\AppData\Local\Intel\PhotoshopDDSPlugin`, and press enter.

## Running the Script

### From the File Menu

You can run the script from Photoshop by navigating to `File > Script > YogDDSExport`.

### Keyboard Shortcut

It is recommended to use a keyboard shourtcut to run the script more easily. You can assign shourtcuts in the menu `Edit > Keyboard Shourtcuts...`. In the window that opens, expand the `File` menu and scroll down to `YogDDSExport` to give it the shortcut you want.

I'd recommend to use something like Ctrl + Shift + Alt + D.

## Details on how to use the Script

### Before Starting

Before you can use the script you have to make sure you have at least one open PSD file, and that it's already saved on your drive. If these conditions are not met the script will show an error leting you know.

### Layers

The script only recognizes layer groups (not individual layers). It's best to keep your layers tidy like in the image below to avoid issues.

![Layers Panel](https://dl.dropboxusercontent.com/u/251256/Github/YogDDSExport/layers.png)

The script only exports layers that begin with a tilde (~), and will show/hide them as needed before exporting each one. However the script doesn't change the visibility of any other layers or layer groups. **If you have unmarked layers on top, they will be visible in all your generated DDS files!**

### Alpha Channels

If there are any Alpha Channels in your PSD, the diffuse texture will be saved as DXT5 instead of DXT1, and it will include the first alpha channel. **If you don't need an alpha make sure you don't have any alpha channels present to reduce filesize of the diffuse texture!**

Alpha channels will not be saved with any textures other than the diffuse map.

### DDS Compression Formats

The script will save each texture using the same formats that Fallout4 uses by default:

- Diffuse Map, Glow Map: BC1 (DXT1) for RGB, BC3 (DXT5) for RBGA (alpha), 4 bits per pixel
- Specular/Gloss Mask, Normal Map: BC5 (two channel red and green), 8 bits per pixel

## Credits

This script is based on and contains portions of code from [VTools by James A. Taylor](http://polycount.com/discussion/49192/vtools-scripts-for-photoshop/).

## License

The MIT License (MIT)
Copyright (c) 2016 Yogensia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.