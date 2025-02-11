import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner; // Import the Scanner class to read text files

public class Main {
    // Main driver method
    public static void main(String[] args)
            throws IOException
    {
        ArrayList<car> cars = new ArrayList<car>();
        ArrayList<igenyek> szemelyek=new ArrayList<igenyek>();

        String filePath = "C:\\Users\\Sprite\\IdeaProjects\\telekocsi\\src\\autok.csv";

        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                new FileInputStream(filePath), "UTF-8"))) { // Specify UTF-8 encoding
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                String[] nextLine = line.split(";");


                cars.add(new car(nextLine[0],nextLine[1],nextLine[2],nextLine[3],Integer.parseInt(nextLine[4])));

            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading the file.");
            e.printStackTrace();
        }

        String filePath2 = "C:\\Users\\Sprite\\IdeaProjects\\telekocsi\\src\\igenyek.csv";


        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                new FileInputStream(filePath2), "UTF-8"))) { // Specify UTF-8 encoding
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                String[] nextLine = line.split(";");
                szemelyek.add(new igenyek(nextLine[0],nextLine[1],nextLine[2],Integer.parseInt(nextLine[3])));

            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading the file.");
            e.printStackTrace();
        }

        int kocsiszam=0;

        for(car auto:cars){
          if((auto.Indulas+auto.Cel).equals("BudapestMiskolc")){
            kocsiszam+=auto.Ferohely;
            }
        //System.out.println(auto.Indulas +auto.Cel);
        }
        HashMap<String, Integer> utvonalak = new HashMap<String, Integer>();
        String NyertesUtvonal="";
        int ferohely=0;
        String utvonal="";
        for(car auto:cars){
            if(!utvonalak.containsKey(auto.Indulas+auto.Cel)){
                utvonalak.put(auto.Indulas+auto.Cel,auto.Ferohely);
            } else {
                utvonalak.put(auto.Indulas+auto.Cel, utvonalak.get(auto.Indulas+auto.Cel)+auto.Ferohely);
            }

        }

        for (String i : utvonalak.keySet()) {

            if(utvonalak.get(i)>ferohely){
                ferohely=utvonalak.get(i);
                utvonal=i;
            }
        }

        //5.feladat szenvedes
        try {
            File myObj = new File("utasuzenetek.txt");
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }


        System.out.println(kocsiszam+" hirdet fuvart");
        System.out.println("legtobb ferohely:"+ utvonal +" "+ ferohely);
        for (igenyek igeny : szemelyek) {
            boolean foundCar = false; // Flag to track if a matching car is found

            for (car auto : cars) {
                if (igeny.indulas.equals(auto.Indulas) && igeny.cel.equals(auto.Cel) && auto.Ferohely >= igeny.szemelyek) {
                    System.out.println(igeny.azonosito + "=>" + auto.Rendszam);
                    try {
                        FileWriter myWriter = new FileWriter("utasuzenetek.txt", true); // Append mode
                        myWriter.write(igeny.azonosito + ": Rendszam: " + auto.Rendszam + ", Telefonszam: " + auto.Telefonszam + "\n");
                        myWriter.close();
                        //System.out.println("Successfully wrote to the file.");
                    } catch (IOException e) {
                        System.out.println("An error occurred.");
                        e.printStackTrace();
                    }
                    foundCar = true; // Mark that a car has been found
                    break; // Exit the loop once a match is found
                }
            }

            if (!foundCar) { // If no car was found, write the "no car found" message
                try {
                    FileWriter myWriter = new FileWriter("utasuzenetek.txt", true); // Append mode
                    myWriter.write(igeny.azonosito + ": Sajnos nem sikerult autot talalni!\n");
                    myWriter.close();
                    //System.out.println("Successfully wrote to the file.");
                } catch (IOException e) {
                    System.out.println("An error occurred.");
                    e.printStackTrace();
                }
            }
        }

    }
}
