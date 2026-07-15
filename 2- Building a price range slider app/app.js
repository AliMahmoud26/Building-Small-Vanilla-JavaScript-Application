const rangeValue = document.querySelector(".slider .price-slider");
const rangeInputValue = document.querySelectorAll(".range-input input");

let priceGap = 500;

const priceInputValue = document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputValue.length; i++) {
    priceInputValue[i].addEventListener("input", e => {
        let minPrice = parseInt(priceInputValue[0].value);
        let maxPrice = parseInt(priceInputValue[i].value);
        let diff = maxPrice - minPrice;

        if (minPrice < 0) {
            alert("Minimum price cannot be less than 0");
            priceInputValue[0].value = 0;
            minPrice = 0;
        }

        if (maxPrice > 10000) {
            alert("Maximum price cannot be greater than 10000");
            priceInputValue[1].value = 10000;
            maxPrice = 10000;
        }

        if (minPrice > maxPrice - priceGap) {
            priceInputValue[0].value = maxPrice - priceGap;
            minPrice = maxPrice - priceGap;

            if (minPrice < 0) {
                priceInputValue[0].value = 0;
                minPrice = 0;
            }
        }

        if (diff >= priceGap && maxPrice <= rangeInputValue[1].max) {
            if (e.target.className === "min-input") {
                rangeInputValue[0].value = minPrice;
                let value1 = rangeInputValue[0].max;
                rangeValue.computedStyleMap.left = `${(minPrice / value1) * 100}%`;
            } else {
                rangeInputValue[1].value = maxPrice;
                let value2 = rangeInputValue[1].max;
                rangeValue.computedStyleMap.right = `${100 - (maxPrice / value2) * 100}%`;
            }
        }

    });

    for (let i = 0; i < rangeInputValue.length; i++) {
        rangeInputValue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputValue[0].value);
            let maxVal = parseInt(rangeInputValue[1].value);

        let diff = maxVal - minVal
        
        // Check if the price gap is exceeded
        if (diff < priceGap) {
        
            // Check if the input is the min range input
            if (e.target.className === "min-range") {
                rangeInputValue[0].value = maxVal - priceGap;
            }
            else {
                rangeInputValue[1].value = minVal + priceGap;
            }
        }
        else {
        
            // Update price inputs and range progress
            priceInputValue[0].value = minVal;
            priceInputValue[1].value = maxVal;
            rangeValue.style.left = `${(minVal / rangeInputValue[0].max) * 100}%`;
            rangeValue.style.right = `${100 - (maxVal / rangeInputValue[1].max) * 100}%`;
    }})
    }
}