import java.io.*;
import java.util.ArrayList;

public class Ingatlan { // Removed parentheses here
    Integer Sorszam;
    String Tipus;
    String Helyseg;
    Integer EpitesEv;
    Integer Alapterulet;
    Integer EladottDb;
    Integer AtlagosElad;

    // Constructor
    public Ingatlan(String line) {
        String data[] = line.split(";");
        Sorszam = Integer.parseInt(data[0]);
        Tipus = data[1];
        Helyseg = data[2];
        EpitesEv = Integer.parseInt(data[3]);
        Alapterulet = Integer.parseInt(data[4]);
        EladottDb = Integer.parseInt(data[5]);
        AtlagosElad = Integer.parseInt(data[6]);
    }

    // Method to read data from file
    public static ArrayList<Ingatlan> beolvasas(String filePath) {
        ArrayList<Ingatlan> ingatlanok = new ArrayList<Ingatlan>();
        try (BufferedReader br = new BufferedReader(
                new FileReader(filePath))) {

            String line;
            br.readLine(); // Assuming this skips the header
            while ((line = br.readLine()) != null) {
                ingatlanok.add(new Ingatlan(line));
            }

        } catch (IOException e) {
            System.out.println("An error occurred while reading the file.");
            e.printStackTrace();
        }
        return ingatlanok;
    }
} // Added missing closing brace
