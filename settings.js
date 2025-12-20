/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import {
    @Vigilant,
    @SwitchProperty,
    @ButtonProperty,
    @TextProperty,
} from 'Vigilance';

@Vigilant('SeymourAnalyzer', '§aSeymour Analyzer Settings', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Display', 'Filters', 'Custom', 'Scanning', 'Rebuild'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        // Sort Custom category properties
        if (a.attributesExt.category === 'Custom') {
            const customOrder = [
                'Custom Color',
                'Add Custom Color',
                'Remove Color',
                'Remove Custom Color',
                'Word Pattern',
                'Add Word Pattern',
                'Remove Word',
                'Remove Word Pattern'
            ];
            
            const aIndex = customOrder.indexOf(a.attributesExt.name);
            const bIndex = customOrder.indexOf(b.attributesExt.name);
            
            return aIndex - bIndex;
        }
        
        // Sort Rebuild category properties
        if (a.attributesExt.category === 'Rebuild') {
            const rebuildOrder = [
                'Rebuild Analysis',
                'Rebuild Matches',
                'Rebuild Word Matches',
                'Rebuild Patterns'
            ];
            
            const aIndex = rebuildOrder.indexOf(a.attributesExt.name);
            const bIndex = rebuildOrder.indexOf(b.attributesExt.name);
            
            return aIndex - bIndex;
        }
        
        return 0;
    }
})
class Settings {
    @SwitchProperty({
        name: 'Info Box',
        description: 'Show the info box when hovering over Seymour pieces',
        category: 'Display',
    })
    infoBoxEnabled = true;

    @SwitchProperty({
        name: 'Item Highlights',
        description: 'Highlight Seymour pieces in chests based on tier',
        category: 'Display',
    })
    highlightsEnabled = true;

    @ButtonProperty({
        name: 'Reset Info Box Position',
        description: 'Reset the info box position to default location',
        category: 'Display',
        placeholder: 'Reset Position'
    })
    resetInfoBoxPosition() {
        ChatLib.command("seymour resetpos", true);
    }

    @SwitchProperty({
        name: 'Fade Dyes',
        description: 'Include fade dyes in analysis',
        category: 'Filters',
    })
    fadeDyesEnabled = true;

    @SwitchProperty({
        name: '3-Piece Sets Filter',
        description: 'Filter helmet from 3-piece sets',
        category: 'Filters',
    })
    threePieceSetsEnabled = true;

    @SwitchProperty({
        name: 'Piece-Specific Matching',
        description: 'Only match colors to their specific piece types',
        category: 'Filters',
    })
    pieceSpecificEnabled = false;

    @SwitchProperty({
        name: 'Custom Colors',
        description: 'Include custom colors in analysis',
        category: 'Filters',
    })
    customColorsEnabled = true;

    @SwitchProperty({
        name: 'Hide High Fades',
        description: 'Hide T2+ fades (only show T1< and T1)',
        category: 'Filters',
    })
    showHighFades = false;

    @SwitchProperty({
        name: 'Word Highlights',
        description: 'Highlight pieces with word patterns',
        category: 'Filters',
    })
    wordsEnabled = true;

    @SwitchProperty({
        name: 'Pattern Highlights',
        description: 'Highlight pieces with special patterns',
        category: 'Filters',
    })
    patternsEnabled = true;

    @SwitchProperty({
        name: 'Dupe Highlights',
        description: 'Highlight duplicate hex codes',
        category: 'Filters',
    })
    dupesEnabled = true;

    @TextProperty({
        name: 'Custom Color',
        description: 'Format: ColorName HEXCODE (e.g., "My Blue 0000FE")',
        category: 'Custom',
        placeholder: 'ColorName HEXCODE'
    })
    customColorInput = "";

    @ButtonProperty({
        name: 'Add Custom Color',
        description: 'Add the custom color entered above',
        category: 'Custom',
        placeholder: 'Add'
    })
    addCustomColorBtn() {
        if (this.customColorInput && this.customColorInput.trim() !== "") {
            ChatLib.command("seymour add " + this.customColorInput.trim(), true);
            this.customColorInput = "";
        } else {
            ChatLib.chat("§c[Seymour] Please enter a color name and hex code!");
        }
    }

    @TextProperty({
        name: 'Remove Color',
        description: 'Enter the color name to remove',
        category: 'Custom',
        placeholder: 'ColorName'
    })
    removeColorInput = "";

    @ButtonProperty({
        name: 'Remove Custom Color',
        description: 'Remove the custom color entered above',
        category: 'Custom',
        placeholder: 'Remove'
    })
    removeCustomColorBtn() {
        if (this.removeColorInput && this.removeColorInput.trim() !== "") {
            ChatLib.command("seymour remove " + this.removeColorInput.trim(), true);
            this.removeColorInput = "";
        } else {
            ChatLib.chat("§c[Seymour] Please enter a color name!");
        }
    }

    @TextProperty({
        name: 'Word Pattern',
        description: 'Format: WORD PATTERN (e.g., "BOOB B00B")',
        category: 'Custom',
        placeholder: 'WORD PATTERN'
    })
    wordPatternInput = "";

    @ButtonProperty({
        name: 'Add Word Pattern',
        description: 'Add the word pattern entered above',
        category: 'Custom',
        placeholder: 'Add'
    })
    addWordPatternBtn() {
        if (this.wordPatternInput && this.wordPatternInput.trim() !== "") {
            ChatLib.command("seymour word add " + this.wordPatternInput.trim(), true);
            this.wordPatternInput = "";
        } else {
            ChatLib.chat("§c[Seymour] Please enter a word and pattern!");
        }
    }

    @TextProperty({
        name: 'Remove Word',
        description: 'Enter the word to remove',
        category: 'Custom',
        placeholder: 'WORD'
    })
    removeWordInput = "";

    @ButtonProperty({
        name: 'Remove Word Pattern',
        description: 'Remove the word pattern entered above',
        category: 'Custom',
        placeholder: 'Remove'
    })
    removeWordPatternBtn() {
        if (this.removeWordInput && this.removeWordInput.trim() !== "") {
            ChatLib.command("seymour word remove " + this.removeWordInput.trim(), true);
            this.removeWordInput = "";
        } else {
            ChatLib.chat("§c[Seymour] Please enter a word!");
        }
    }
    
    @SwitchProperty({
        name: 'Item Frame Scanning',
        description: 'Automatically scan Seymour pieces in item frames',
        category: 'Scanning',
    })
    itemFramesEnabled = true;

    @ButtonProperty({
        name: 'Start Scanning',
        description: 'Start scanning chests for Seymour pieces',
        category: 'Scanning',
        placeholder: 'Start Scan'
    })
    startScanning() {
        ChatLib.command("seymour scan start", true);
    }

    @ButtonProperty({
        name: 'Stop Scanning',
        description: 'Stop scanning chests for Seymour pieces',
        category: 'Scanning',
        placeholder: 'Stop Scan'
    })
    stopScanning() {
        ChatLib.command("seymour scan stop", true);
    }

    @ButtonProperty({
        name: 'Start Export',
        description: 'Start exporting scanned pieces to clipboard',
        category: 'Scanning',
        placeholder: 'Start Export'
    })
    startExport() {
        ChatLib.command("seymour export start", true);
    }

    @ButtonProperty({
        name: 'Stop Export',
        description: 'Stop exporting and copy to clipboard',
        category: 'Scanning',
        placeholder: 'Stop Export'
    })
    stopExport() {
        ChatLib.command("seymour export stop", true);
    }

    @ButtonProperty({
        name: 'Rebuild Word Matches',
        description: 'Rebuild word match data for all pieces',
        category: 'Rebuild',
        placeholder: 'Rebuild Words'
    })
    rebuildWords() {
        ChatLib.command("seymour rebuild words", true);
    }

    @ButtonProperty({
        name: 'Rebuild Analysis',
        description: 'Rebuild analysis with current toggle settings',
        category: 'Rebuild',
        placeholder: 'Rebuild Analysis'
    })
    rebuildAnalysis() {
        ChatLib.command("seymour rebuild analysis", true);
    }

    @ButtonProperty({
        name: 'Rebuild Matches',
        description: 'Rebuild top 3 match data for all pieces',
        category: 'Rebuild',
        placeholder: 'Rebuild Matches'
    })
    rebuildMatches() {
        ChatLib.command("seymour rebuild matches", true);
    }

    @ButtonProperty({
        name: 'Rebuild Patterns',
        description: 'Rebuild pattern data for all pieces',
        category: 'Rebuild',
        placeholder: 'Rebuild Patterns'
    })
    rebuildPatterns() {
        ChatLib.command("seymour rebuild pattern", true);
    }

    constructor() {
        this.initialize(this);
        
        this.setCategoryDescription('Display', 'Visual display settings for the analyzer');
        this.setCategoryDescription('Filters', 'Filter which colors and dyes to analyze');
        this.setCategoryDescription('Custom', 'Manage custom colors and word patterns');
        this.setCategoryDescription('Scanning', 'Control automatic scanning of Seymour pieces');
        this.setCategoryDescription('Rebuild', 'Rebuild collection data with current settings');
        
        // Register listeners - just run the toggle commands
        this.registerListener('Info Box', (newValue) => {
            try {
                ChatLib.command("seymour toggle infobox", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Item Highlights', (newValue) => {
            try {
                ChatLib.command("seymour toggle highlights", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Fade Dyes', (newValue) => {
            try {
                ChatLib.command("seymour toggle fade", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('3-Piece Sets Filter', (newValue) => {
            try {
                ChatLib.command("seymour toggle 3p", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Piece-Specific Matching', (newValue) => {
            try {
                ChatLib.command("seymour toggle sets", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Custom Colors', (newValue) => {
            try {
                ChatLib.command("seymour toggle custom", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Hide High Fades', (newValue) => {
            try {
                ChatLib.command("seymour toggle highfades", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Word Highlights', (newValue) => {
            try {
                ChatLib.command("seymour toggle words", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Pattern Highlights', (newValue) => {
            try {
                ChatLib.command("seymour toggle pattern", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Dupe Highlights', (newValue) => {
            try {
                ChatLib.command("seymour toggle dupes", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
        
        this.registerListener('Item Frame Scanning', (newValue) => {
            try {
                ChatLib.command("seymour toggle itemframes", true);
            } catch (e) {
                ChatLib.chat("§c[Seymour] Settings error: " + e);
            }
        });
    }
}

export default new Settings();