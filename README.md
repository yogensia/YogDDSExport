# YogDDSExport
#### [Sublime Text 2](http://www.sublimetext.com/2)

## About

YogDDSExport is a script for Photoshop writen in JavaScript that makes it fster to export DDS files for Fallout 4.

It's based on VTools but much simpler and without options dialogs. This is how it works:

1. Organize the textures in layer groups inside your PSD file, using the usual suffixes preceeded by a tilde, Ex: a group named `~_d`, one named `~_s`, one named `~_n`, etc.
3. When you execute it, the script will look in your layer groups and export the ones marked with tildes to dds files.

- Naming is done automatically. If your PSD is called pistol.psd, the script will generate `pistol_d.dds`, `pistol_s.dds` & `pistol_n.dds`, and save them for you in the same folder as the PSD file.
- DDS compression formats are handled by the script as well. It will save diffuse and glow maps as BC1 (DXT1)/BC3 (DXT5), and specular/gloss mask or normalmaps as BC5, just like the original textures of the game.
- If your PSD has an alpha channel in the channels panel, it will be saved with your diffuse map.

## Requirements

The YogDDSExport requires [Intel® Texture Works Plugin for Photoshop](https://software.intel.com/en-us/articles/intel-texture-works-plugin) to write DDS files, as well as three presets included in the download.

NVIDIA's DDS plugin is not supported since it's considerably outdated and can't work with BC5 and similar compression formats.

YogDDSExport has only been tested in Photoshop CC 2015, but it should work in CS6 or above versions.

## Download

**[You can download YogDDSExport from this link]()**.

## Install

1. Make sure you have installed the [Intel® Texture Works Plugin for Photoshop](https://software.intel.com/en-us/articles/intel-texture-works-plugin) and run photoshop at least once.
2. Extract the YogDDSExport folder to `C:\Program Files\Adobe\Adobe Photoshop CC 2015\Presets\Scripts`.
3. Extract the presset files to `C:\Users\YourName\AppData\Local\Intel\PhotoshopDDSPlugin`
4. Restart Photoshop if it was already open.

Note: The AppData directory is hidden by default in Windows. If you have trouble opening it, open the start menu, type `%userprofile%\AppData\Local\Intel\PhotoshopDDSPlugin`, and press enter.

## Running the Script

### From the File Menu

You can run the script from Photoshop by opening navigating to `File > Script > YogDDSExport`.

### Keyboard Shortcut

It is recommended to use a keyboard shourtcut to run the script more easily. You can assign shourtcuts in the menu `Edit > Keyboard Shourtcuts...`. In the windows that opens, expand the  `File` menu and scroll down to `YogDDSExport`. I'd recommend to use something like Ctrl + Shift + Alt + D.

## Details on how to use the Script

### Layers

The script only recognizes layer groups (not individual layers). It's best to keep you layers tidy like in the image below to avoid confusion.

The script only exports layers that begin with a tilde (~), and will show/hide them as needed before exporting each one. However the script doesn't change the visibility of any other layers. **If you have unmarked layers on top, they will be visible in all generated DDS files!**

### Alpha Channels

If there are any Alpha Channels in your PSD, the diffuse texture will be saved as DXT5 instead of DXT1, and it will include the first alpha channel. **If you don't need an alpha make sure you don't have any alpha channels present to reduce filesize of the diffuse texture!**

Alpha channels will not be saved with any other textures other than the diffuse.

### DDS Compression formats

The script will save each texture using the same formats that Fallout4 uses by default:

- Diffuse Map, Glow Map: BC1 (DXT1) for RGB, BC3 (DXT5) for RBGA (alpha), 4 bits per pixel
- Specular/Gloss Mask, Normal Map: BC5 (two channel red and green), 8 bits per pixel

## License

The MIT License (MIT)
Copyright (c) 2016 Yogensia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.