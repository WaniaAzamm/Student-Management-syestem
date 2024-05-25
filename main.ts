#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const choose = await inquirer.prompt({
    name: "Enroll",
    type: "confirm",
    message: "Do You want to enroll in Course?",
});

if (choose.Enroll == true) {
    const stuName = await inquirer.prompt([
        {
            name: "studentname",
            type: "input",
            message: "What is your Name?",
        },
    ]);

    function generatingPin() {
        return Math.floor(Math.random() * 90000) + 10000;
    }
    const generatedPin = generatingPin();

    console.log(chalk.green(`${stuName.studentname}, Thank you for enrolling in our courses, your Student ID is ${generatedPin}`));

    let pincode;
    while (true) {
        pincode = await inquirer.prompt({
            name: "pincode",
            type: "number",
            message: "Write your Student ID!!",
        });
        if (pincode.pincode === generatedPin) {
            console.log(chalk.green(`${stuName.studentname}, You've successfully logged in to the portal!!`));
            break;
        } else {
            console.log(chalk.red("Wrong Student ID! Please try again."));
        }
    }

    const courseName = await inquirer.prompt([
        {
            name: "course",
            type: "list",
            message: "please select courses",
            choices: ["Typescript", "HTML", "CSS", "PYTHON"],
        },
    ]);

    let courseFee = 0;
    if (courseName.course === "Typescript") {
        courseFee = 10;
    } else if (courseName.course === "HTML") {
        courseFee = 5;
    } else if (courseName.course === "CSS") {
        courseFee = 5;
    } else if (courseName.course === "PYTHON") {
        courseFee = 15;
    } else {
        console.log(chalk.red("Please Select a Course!!"));
    }
    console.log(chalk.green(`Your Course Fee for ${courseName.course} is ${courseFee}$.`));

    const payment = await inquirer.prompt({
        name: "paymentransfer",
        type: "list",
        message: "please Select Method!!",
        choices: ["Easy paisa", "Jazz cash"],
    });

    console.log(chalk.green(`you Select ${payment.paymentransfer} method!!`));

    let paymentAmount;
    let paymentMethod;
    let balance = 20;

    if (payment.paymentransfer === "Easy paisa") {
        const easyPaisaPin = await inquirer.prompt({
            name: "pincode",
            type: "input",
            message: "please enter your pincode for easy paisa Account!!",
        });
        console.log(chalk.green(`${stuName.studentname}, you've entered in your easy paisa account, your Balance is ${balance}!!`));
        paymentAmount = await inquirer.prompt({
            name: "easypaisa",
            type: "input",
            message: "Please enter your amount (fees)!!",
        });
        paymentMethod = "easypaisa";
        while (paymentAmount.easypaisa != courseFee) {
            console.log(chalk.red(`Payment amount does not match the course fee. Please try again.`));
            paymentAmount = await inquirer.prompt({
                name: paymentMethod,
                type: "input",
                message: "Please Enter your Amount (fees)!!",
            });

        }
        console.log(chalk.green(`${stuName.studentname}, your ${paymentAmount.easypaisa}$ has been transferred!!`));
    } else if (payment.paymentransfer === "Jazz cash") {
        const jazzCashPin = await inquirer.prompt({
            name: "jazzcash",
            type: "input",
            message: "please enter your pincode for jazzcash account!!",
        });
        console.log(chalk.green(`${stuName.studentname}, you've entered in your jazz cash account, your Balance is ${balance}!!`));
        paymentAmount = await inquirer.prompt({
            name: "jazzcash",
            type: "input",
            message: "Please enter your amount (fees)!!",
        });
        paymentMethod = "jazzcash";
        while (paymentAmount.jazzcash != courseFee) {
            console.log(chalk.red(`Payment amount does not match the course fee. Please try again.`));
            paymentAmount = await inquirer.prompt({
                name: paymentMethod,
                type: "input",
                message: "Please enter your amount (fees)!!",
            });


        }
        console.log(chalk.green(`${stuName.studentname}, your ${paymentAmount.jazzcash}$ has been trasnferred!!`));
    }

    if (pincode.pincode === generatedPin) {
        const viewBalance = await inquirer.prompt({
            name: "viewbalance",
            type: "confirm",
            message: "Do you want to view your balance?",
        });
        if (viewBalance.viewbalance == true) {
            console.log(chalk.green(`your Balance is : ${balance - courseFee}$.`));
        }

        const viewStatus = await inquirer.prompt({
            name: "viewstatus",
            type: "confirm",
            message: "Do you want to view your status?",
        });
        if (viewStatus.viewstatus == true) {
            console.log(chalk.green(" -----------Student Status------------"));
            console.log(chalk.green(`Student Name : ${stuName.studentname}`));
            console.log(chalk.green(`Student ID : ${pincode.pincode}`));
            console.log(chalk.green(`Course: ${courseName.course}`));
            console.log(chalk.green("Enrolled: yes"));
            console.log(chalk.green(`Fees: ${courseFee}$`));
            console.log(chalk.green(`Balance: ${balance - courseFee}$`));
        } else {
            console.log(chalk.green("Thank you For Enrolled!!"));
        }
    }
} else {
    console.log(chalk.red("Thank you for visiting!!"));
}
