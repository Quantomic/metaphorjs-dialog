
var defineClass = require("metaphorjs-class/src/func/defineClass.js"),
    getPosition = require("metaphorjs/src/func/dom/getPosition.js"),
    getOffset = require("metaphorjs/src/func/dom/getOffset.js");

require("./Abstract.js");

defineClass({

    $class: "$dialog.position.Target",
    $extends: "$dialog.position.Abstract",

    getCoords: function(e, type, absolute) {

        var self    = this,
            dlg     = self.dialog,
            cfg     = dlg.getCfg(),
            target  = dlg.getTarget();

        if (!target) {
            return null;
        }

        var pBase   = self.getPositionBase(),
            size    = dlg.getDialogSize(),
            offset  = pBase && !absolute ? getPosition(target, pBase) : getOffset(target),
            tsize   = dlg.getTargetSize(),
            pos     = {},
            type    = type || self.type,
            pri     = type.substr(0, 1),
            sec     = type.substr(1),
            offsetX = cfg.position.offsetX,
            offsetY = cfg.position.offsetY,
            pntOfs  = dlg.pointer.getDialogPositionOffset(type);



        switch (pri) {
            case "t": {
                pos.y   = offset.top - size.height - offsetY;
                break;
            }
            case "r": {
                pos.x   = offset.left + tsize.width + offsetX;
                break;
            }
            case "b": {
                pos.y   = offset.top + tsize.height + offsetY;
                break;
            }
            case "l": {
                pos.x   = offset.left - size.width - offsetX;
                break;
            }
        }

        switch (sec) {
            case "t": {
                pos.y   = offset.top + offsetY;
                break;
            }
            case "r": {
                pos.x   = offset.left + tsize.width - size.width - offsetX;
                break;
            }
            case "b": {
                pos.y   = offset.top + tsize.height - size.height - offsetY;
                break;
            }
            case "l": {
                pos.x   = offset.left + offsetX;
                break;
            }
            case "rc": {
                pos.x   = offset.left + tsize.width + offsetX;
                break;
            }
            case "lc": {
                pos.x   = offset.left - size.width - offsetX;
                break;
            }
            case "": {
                switch (pri) {
                    case "t":
                    case "b": {
                        pos.x   = offset.left + (tsize.width / 2) - (size.width / 2);
                        break;
                    }
                    case "r":
                    case "l": {
                        pos.y   = offset.top + (tsize.height / 2) - (size.height / 2);
                        break;
                    }
                }
                break;
            }
        }

        if (pntOfs) {
            pos.x += pntOfs.x;
            pos.y += pntOfs.y;
        }

        return pos;
    },

    getPrimaryPosition: function(pos) {
        return (pos || this.type).substr(0, 1);
    },

    getSecondaryPosition: function(pos) {
        return (pos || this.type).substr(1);
    },

    getAllPositions: function() {
        return ["t", "r", "b", "l", "tl", "tr", "rt", "rb", "br", "bl", "lb", "lt", "tlc", "trc", "brc", "blc"];
    }

});

