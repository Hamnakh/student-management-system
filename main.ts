#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//define the student class
class student{
    static counter = 12000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }
    //method to enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course);
    }
    //method to view a student balance
    view_balance(){
        console.log(`balacne for ${this.name} : $(this.balance)`); 
    }
    //method to pay student fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(chalk.yellow(`$${amount}fees paid successfully for ${this.name}`));
        console.log(`Remaining balance : $${this.balance}`);
        
        
    }
    //method to display student status
    show_status(){
        console.log(`id: ${this.id}`);
        console.log((`name: ${this.name}`));
        console.log(`courses: ${this.courses}`);
        console.log(`balance: ${this.balance}`);
    }
}

//definition a student_manager class to manage students
class Student_manager {
    students: student[]

    constructor(){
        this.students = [];
    }

    //method to add a new student
    add_student(name: string){
       let Student =  new student(name);
       this.students.push(Student);
       console.log(chalk.red(`Student: ${name} added successfully.student id: ${Student.id}`));
    }

    
    //Method to enroll a student in a course
    enroll_student(student_id: number, course: string){
        let student = this.students.find(std => std.id === student_id);
        if (student){
            student.enroll_course(course);
            console.log(chalk.yellowBright(`${student.name} enrolled in ${course} successfully`));
        }
    }
    //method to view a student balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.view_balance()
        }
        else{
            console.log("student not found. please enter a correct student id");
            
        }
    }
    //method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount)
        } 
        else{
            console.log(chalk.greenBright("student not found. please enter a correct student id")); 
        }
    }
    //method to display student status
    show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.show_status();
        }
    }

    //method to find a student by student_id

    find_student(student_id: number){
    return this.students.find(std=> std.id === student_id);
        }
    }
    //main function to run the program
    async function main(){
        console.log (chalk.green("Welcome to 'CodeWithHamna' - Student Management System"));
        console.log(chalk.redBright("-".repeat(50)));

        let student_manager = new Student_manager();
        //while loop to keep program running
        while(true){
            let choice = await inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    message: "select an option",
                    choices: [
                        "add student",
                        "enroll student",
                        "view student balance",
                        "pay fees",
                        "show status",
                        "exit"
                    ]

                     }
            ]);
            //using switch case to handle user choice
            switch(choice.choice){
               case  "add student":
                let name_input = await inquirer.prompt([
                    {
                     name: "name",
                     type: "input",
                     message: "enter a student name",
                    }
                    ]);
                    student_manager.add_student(name_input.name);
                    break; 
               
               case  "enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;

                case "view student balance":
                    let balacne_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "enter a student id",
                        }
                    ]);
                    student_manager.view_student_balance(balacne_input.student_id);
                    break;

                    case "pay fees":
                        let fees_input = await inquirer.prompt([
                            {
                                name: "student_id",
                                type: "number",
                                message: "enter a student id",
                            },
                            {
                                name: "amount",
                                type: "number",
                                message: "enter the amount to pay"
                            }
                        ]);
                        student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                        break;
                        case "show status":
                            let status_input = await inquirer.prompt([
                                {
                                    name: "student_id",
                                    type: "number",
                                    message: "enter a student id"
                                }
                            ]);
                            student_manager.show_student_status(status_input.student_id);
                            break;
                            case"exit":
                            console.log(chalk.yellow("exiting..."));
                            process.exit();
            }
        }
    }
    //calling a main function
    main();