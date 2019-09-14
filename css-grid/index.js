// ZALANDO TEST
// QUESTION 1
// Function to return the count of '1' in a binary representation of
// a product of given two non-negative integers
function solution(A, B) {
    // Get the product
    const product = A * B;

    // Convert to binary
    const binary = product.toString(2);

    let count = 0;
    // Split the binary string to array and do a for each
    binary.split('').forEach(function(number, index, arr) {
        if (number === '1') {
            count++;
        }
    });

    console.log('Count is', count);

    // Another method
    let count2 = 0;

    for (i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            count2++;
        }
    }
    console.log('Count 2 is', count2);

    // Third method using regex, use this
    const count3 = binary.match(/1/g).length;
    console.log('Count 3 is', count3);

    return count;
}

solution(9, 5);

//QUESTION 2
// Return the count of incorrectly styled table rows from the given table
function compareDates(today, limit) {
    // Get all the table rows
    const tableRows = document.getElementsByTagName('tr');

    let counter = 0;
    for (let i = 0; i < tableRows.length; i++) {
        const todayDate = new Date(today);
        //console.log($(this).children('td'));
        const tr = tableRows[i];

        const borrowedDateString = $(tr)
            .children('td:nth-child(2)')
            .html();

        const returnedDateString = $(tr)
            .children('td:nth-child(3)')
            .html();

        let borrowedDate = '';
        if (borrowedDateString) {
            borrowedDate = new Date(borrowedDateString);
        } else {
            borrowedDate = null;
        }

        let returnedDate = '';
        if (returnedDateString) {
            returnedDate = new Date(returnedDateString);
        } else {
            // If not returned yet, set the returned date to today
            // for comparing with the borrowed date
            returnedDate = todayDate;
        }

        // Also get the style for this row
        const style = $(tr).attr('style');

        // Get the differnece in borrowedDate and returnedDate
        const difference = returnedDate - borrowedDate;
        // A day may not be exactly 24 hours every day, so round to get the nearest integer
        const differenceInDays = Math.round(difference / 1000 / 60 / 60 / 24);

        // If difference in days is more than 14 and there is no
        // background color of red, the coloring for this row is incorrect
        if (differenceInDays > 14 && style === undefined) {
            counter++;
        }

        // If difference in days is less than 14 and there is red
        // background color, the coloring for this row is incorrect
        if (differenceInDays < 14 && style !== undefined) {
            counter++;
        }
    }
    //console.log('Counter is ', counter);

    return counter;
}

//compareDates('2016-11-30', 14);

// QUESTION: Write a function, function solution(N); that, given a non-negative integer,
// returns the number of digits equal to 1 in the decimal representation of 11^N.
// N is an integer with the range [0....10000]
function getNumberofOnes(n) {
    let number1 = '11';

    let number2 = '11';

    for (let k = 1; k < n; k++) {
        //console.log('Number 1 is ', number1);
        //console.log('Number 2 is ', number2);
        const product = Array(number1.length + number2.length).fill(0);
        //console.log('Product 1 is ', product);

        for (let i = number1.length; i--; 0) {
            //console.log('Number1[i] is ', number1[i]);
            let carry = 0;
            //console.log('Carry in first loop is ', carry);
            for (let j = number2.length; j--; 0) {
                //console.log('Numbner2[j] is ', number2[j]);
                product[1 + i + j] += carry + number1[i] * number2[j];
                //console.log('Product 2 is ', product);
                carry = Math.floor(product[1 + i + j] / 10);
                //console.log('Carry in second loop is ', carry);
                product[1 + i + j] = product[1 + i + j] % 10;
                //console.log('Product 3 is ', product);

                //console.log('================');
            }

            product[i] += carry;
            //console.log('---------------------');
        }

        number1 = product.join('').replace(/^0*(\d)/, '$1');
        //console.log('..................................................');
    }

    console.log('Number 1 is ', number1);

    const count = number1.match(/1/g).length;

    console.log('Count is ', count);

    return count;
}

//getNumberofOnes(1000);

// ZALANDO DEMO TEST
function getMissingSmallestInteger(A) {
    const array = A.filter((number) => number > 0);
    array.sort();
    // write your code in JavaScript (Node.js 8.9.4)
    for (let i = 1; i <= array.length + 1; i++) {
        if (!A.includes(i)) {
            return i;
        }
    }
}

//getMissingSmallestInteger([1, 3, 6, 4, 1, 2]);
