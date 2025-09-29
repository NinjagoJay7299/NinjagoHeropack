import java.util.Scanner;

public class QuadraticSolver {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("What are you solving for? (d or int): ");
        String typeofeq = scanner.nextLine();

        System.out.print("a value: ");
        double a = scanner.nextDouble();

        System.out.print("b value: ");
        double b = scanner.nextDouble();

        System.out.print("c value: ");
        double c = scanner.nextDouble();

        double disc = Math.pow(b, 2) - 4 * a * c;

        if (typeofeq.equals("int")) {
            if (disc >= 0) { // Handle real solutions
                double equationPos = (-b + Math.sqrt(disc)) / (2 * a);
                double equationNeg = (-b - Math.sqrt(disc)) / (2 * a);
                System.out.println("x = " + equationNeg + ", x = " + equationPos);
            } else { // Handle complex solutions
                double realPart = -b / (2 * a);
                double imaginaryPart = Math.sqrt(-disc) / (2 * a);
                System.out.println("x = " + realPart + " +/- " + imaginaryPart + "i");
            }
        } else if (typeofeq.equals("d")) {
            System.out.println("The discriminant is: " + disc);
            if (disc > 0) {
                System.out.println("There are two real solutions");
            } else if (disc == 0) {
                System.out.println("There is one real solution");
            } else {
                System.out.println("There are two complex solutions");
            }
        } else {
            System.out.println("Invalid input for 'typeofeq'. Please enter 'd' or 'int'.");
        }

        scanner.close();
    }
}