import java.io.*;
import java.time.Year;
import java.util.ArrayList;
import java.util.Comparator;

public class Main {
    public static void main(String[] args)
    throws IOException
    {
        ArrayList<Ingatlan> ingatlanok=Ingatlan.beolvasas("src/ingatlanok.csv");
        //5.feladat megoldasa

        System.out.println(ingatlanok.size() + " DB ingatlan talalhato!");

        //6.feladat megoldasa

        System.out.println(ingatlanok);
        ArrayList<Integer> AtlagTer = new ArrayList<Integer>();

        for(Ingatlan property:ingatlanok){
            //System.out.println(property.Alapterulet);
            AtlagTer.add(property.Alapterulet);
        }
        int sum = 0;
        for (int num : AtlagTer) {
            sum += num;
        }
        double average = (double)sum / AtlagTer.size();
        System.out.println("Az ingatlanok esetében az átlagos alapterület: " + average + " négyzetméter");

        //7.feladat megoldasa
        int currentYear=Year.now().getValue();
        System.out.println("Az elmult 10 evben epitett ingatlanok: ");
        for(Ingatlan property:ingatlanok){
            if(currentYear - property.EpitesEv <= 10 ){
                System.out.println(property.Tipus +" "+ property.Helyseg +" "+ property.EpitesEv);
            }
        }

        //8.feladat megoldasa

        //ha lowest to highest
        ingatlanok.sort(Comparator.comparingInt(ingatlan -> ingatlan.EladottDb));
        //ha highest to lowest
        ingatlanok.sort(Comparator.comparingInt((Ingatlan ingatlan) -> ingatlan.EladottDb).reversed());
        System.out.println("Legsikeresebb helyiségek az eladott darabszám alapján:");
       for(Ingatlan property:ingatlanok){
           System.out.println(property.Helyseg + " : " + property.EladottDb + " ingatlan");
       }

       //9.feladat

        int i=0;
        Ingatlan Legdragabb= null;

        for(Ingatlan property:ingatlanok){
            if(i<property.AtlagosElad){
                i=property.AtlagosElad;
                Legdragabb=property;
            }
        }
        System.out.println(Legdragabb.Tipus +" "+ Legdragabb.AtlagosElad + " forint");


    }




}