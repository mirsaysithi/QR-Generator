
var qrcode = null; 

function generateQRCode() {
    var upcBarcode = document.getElementById("upcBarcode").value;
    var lotNumber = document.getElementById("lotNumber").value.toUpperCase();
    var expirationDate = document.getElementById("expirationDate").value;

    var upcBarcodeError = document.getElementById("upcBarcodeError");
    var lotNumberError = document.getElementById("lotNumberError");
    var expirationDateError = document.getElementById("expirationDateError");

    // Clear any previous error messages
    upcBarcodeError.textContent = "";
    lotNumberError.textContent = "";
    expirationDateError.textContent = "";

    // Check if upcBarcode has more than 12 digits
    if (upcBarcode.trim() === "") {
        upcBarcodeError.textContent = "UPC Barcode cannot be left blank.";
        return;
    }
    
    // Check if upcBarcode is empty or contains non-numeric characters
    if (upcBarcode.trim() === "" || !/^\d+$/.test(upcBarcode)) {
    upcBarcodeError.textContent = "UPC Barcode should contain only numeric characters.";
        return;
    }

    // Check if upcBarcode has more than 12 digits
    if (upcBarcode.length !== 12) {
        upcBarcodeError.textContent = "UPC Barcode should contain exactly 12 digits.";
        return;
    }

    // Check if lotNumber is empty
    if (lotNumber.trim() === "") {
        lotNumberError.textContent = "Lot Number cannot be left blank.";
        return;
    }

    // Check if expirationDate is empty
    if (expirationDate.trim() === "") {
        expirationDateError.textContent = "Expiration Date cannot be left blank.";
        return;
    }

    // Check if expirationDate is today or in the past
    var currentDate = new Date().setHours(0, 0, 0, 0);
    var selectedDate = new Date(expirationDate).setHours(0, 0, 0, 0);
    if (selectedDate <= currentDate) {
        expirationDateError.textContent = "Expiration date cannot be in the past. Please return product or re-enter expiration date.";
        return;
   
    }


    // Generate GS1 QR code with the input data
    var gs1QRCode = "0100" + upcBarcode +
                    "10" + lotNumber +
                    "~17" + expirationDate.replace(/-/g, '').slice(-6);

    // Removes existing QR code element when new QR is generated
    var qrcodeElement = document.getElementById("qrcode");
    while (qrcodeElement.firstChild) {
        qrcodeElement.removeChild(qrcodeElement.firstChild);
    }

    // Generate QR code using qrcode.js library
    qrcode = new QRCode(qrcodeElement, {
    text: gs1QRCode,
    width: 128,
    height: 128
    });

    var qrcodeText = document.getElementById("qrcodeText");
    qrcodeText.innerText = "UPC Barcode: " + upcBarcode + "\nLot Number: " + lotNumber + "\nExpiration Date: " + expirationDate.replace(/-/g, '').slice(-6);
}
