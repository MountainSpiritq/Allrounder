import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

public class Main {


    private class Utazo {
        String nev;
        String varos;
        String datum;
        String indulas;

        public Utazo(String sor){
            String[] s = sor.split(";");
            nev = s[0];
            varos = s[1];
            datum= s[2];
            indulas = s[3];
        }
    }
    ArrayList<Utazo> utazok = new ArrayList<>();

    private void betolt(String fajlnev){
        Scanner be = null;
        try{
            be = new Scanner(new File(fajlnev));
            while(be.hasNextLine()){
                utazok.add(new Utazo(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally{
            if(be != null) be.close();
        }
    }


    public Main(){
        //0-1-2.feladat
        betolt("utazok.csv");

        int utazokSzama=0;
        TreeMap<String,Integer> varosok=new TreeMap<>();

        for (Utazo ember:utazok){
            utazokSzama++;
            if (!varosok.containsKey(ember.varos)){
                varosok.put(ember.varos, 1);
            }else{
                varosok.put(ember.varos, varosok.get(ember.varos)+1);
            }
        }
        System.out.printf("%s utazo adata lett beolvasva\n",utazokSzama);

        Random r=new Random();
        int randomVaros=r.nextInt(varosok.size());
        System.out.printf("osszesen %s varosban utaznak\n a veletlen szeruen kivalasztott varos %s\n ebbe a varosba %s utazo erkezett\n",varosok.size(),varosok.keySet().toArray()[randomVaros],varosok.get(varosok.keySet().toArray()[randomVaros].toString()));

        //3.feladat
        TreeMap<String,Integer> honapok=new TreeMap<>();

        for (Utazo ember:utazok){
            //System.out.println( ember.datum.split("\\.")[0]);

            if (!honapok.containsKey(ember.datum.split("\\.")[0])){
                honapok.put(ember.datum.split("\\.")[0],1);
            }else{
                honapok.put(ember.datum.split("\\.")[0],honapok.get(ember.datum.split("\\.")[0])+1);
            }
        }
        System.out.println("Az utazasok szama honaponkent: ");
        System.out.println();

        for (Object i:honapok.keySet().toArray()){
            System.out.printf("%s.ho : %d utazas\n",i,honapok.get(i.toString()));
        }

        //4.feladat
        TreeMap<String,Integer> vezetekNevek=new TreeMap<>();

        for (Utazo ember:utazok){
            vezetekNevek.merge(ember.nev.split(" ")[0],1, Integer::sum);
        }

        System.out.println("Tobszor is szereplo vezetek nevek");
        for (Object i:vezetekNevek.keySet().toArray()){
            if(vezetekNevek.get(i)>1){
                System.out.printf("%s ",i);
            }
        }

        //5.feladat
        TreeMap<String,Integer> napok=new TreeMap<>();

        for (Utazo ember:utazok){
            napok.merge(ember.datum, 1, Integer::sum);
        }
        System.out.printf("\nUgyanazon a napon 2 nel tobb utazas:");
        for(Object i:napok.keySet().toArray()){
            if (napok.get(i)>2){
                System.out.printf("%s(%s) ",i,napok.get(i).toString());
            }
        }

        //6.feladat
        PrintWriter ki = null;
        try {
            ki = new PrintWriter((new File("szeged.txt")));
            for (Utazo eszkoz : utazok){
                if(eszkoz.varos.equals("Szeged")){
                    ki.write(eszkoz.nev+" ("+eszkoz.datum +" "+eszkoz.indulas + ")\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(ki != null){
                ki.close();
            }

    }




    }



    public static void main(String[] args) {
        new Main();

        }
}