var gEntreeCount = 0;
										// returns a number that represents the sum of all the selected menu
										// item prices.
function calculateBill(idMenuTable) {
	var fBillTotal = 0.0;
	var i=0;

	var aCBTags = document.getElementsByTagName('INPUT');
	for (i=0; i < aCBTags.length; i++) {
										// is this menu item selected? it is if the checkbox is checked
		if (aCBTags[i].checked) {
										// get the checkbox' parent table row
			var oTR = getParentTag(aCBTags[i],'TR');
			
										// retrieve the price from the price column, which is the third column in the table
			var oTDPrice = oTR.getElementsByTagName('TD')[2];
										// the first child text node of the column contains the price
			fBillTotal += parseFloat(oTDPrice.firstChild.data);
		};
	};
										// return the price as a decimal number with 2 decimal places
	return Math.round(fBillTotal*100.0)/100.0;
};

										// This function either turns on or off the row highlighting for GlutenFree
										// items (depending on the value of bShowGF)
function highlightGF(idTable, bShowGF) {
                                        // if bShowVeg is true, then we're highlighting vegetarian
                                        //	meals, otherwise we're unhighlighting them.
    var i=0;
    var oTable = document.getElementById(idTable);
    var oTBODY = document.getElementsByTagName('TBODY')[0];
    var aTRs = oTBODY.getElementsByTagName('TR');
                                            // walk through each of the table rows and see if it has a 
                                            // "vegetarian" attribute on it.
    for (i=0; i < aTRs.length; i++) {
        if (aTRs[i].getAttribute('GlutenFree') == "true") {
            if (bShowGF){
                aTRs[i].style.backgroundColor = "lightGreen";
            } else {
                aTRs[i].style.backgroundColor = "";
            };
        };
    };
};

											// Utility function for getting the parent tag of a given tag
											// but only of a certain type (i.e. a TR, a TABLE, etc.)
function getParentTag(oNode, sParentType) {
	var oParent = oNode.parentNode;
	while (oParent) {
		if (oParent.nodeName == sParentType)
			return oParent;
		oParent = oParent.parentNode;
	};
	return oParent;
};
