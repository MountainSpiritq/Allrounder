import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;
import java.util.TreeSet;

public class Main {

    private class Kigyo {
        String faj;
        int hossz;
        String elofordulas;
        String merges;

        public Kigyo(String sor){
            String[] s = sor.split(";");
            faj = s[0];
            hossz = Integer.parseInt(s[1]);
            elofordulas = s[2];
            merges = s[3];
        }
    }

    ArrayList<Kigyo> kigyok = new ArrayList<>();

    private void betolt(String fajlnev) {
        try(Scanner be =new Scanner(new File(fajlnev))) {
            be.nextLine();
            while (be.hasNextLine()) {
                kigyok.add(new Kigyo(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public Main(){
        betolt("kigyok.csv");

        //0.feladat
        System.out.printf("Osszesn %s kigyo adata lett beolvasva\n",kigyok.size());
        int merges=0;
        int nemMerges=0;
        for (Kigyo kigyo:kigyok){
            if (kigyo.merges.equals("Igen")){
                merges++;
            }else{
                nemMerges++;
            }
        }
        System.out.printf("Kozuluk %s merges es %s nem merges\n",merges,nemMerges);

        Double kigyoMeter=0.0;
        for (Kigyo kigyo:kigyok){
            kigyoMeter+=kigyo.hossz;
        }
        System.out.printf("A kigyok ossz hossza meterben: %.2f m\n",kigyoMeter/100);

        int leghosszabbMergesHosz=0;
        String leghosszabbMergesNev="";

        for (Kigyo kigyo:kigyok){
            if (kigyo.merges.equals("Igen")&&kigyo.hossz>leghosszabbMergesHosz){
                leghosszabbMergesHosz=kigyo.hossz;
                leghosszabbMergesNev=kigyo.faj;
            }
        }
        System.out.printf("A leghosszabb merges kigyo a %s a hossza (%s)\n",leghosszabbMergesNev,leghosszabbMergesHosz);

        TreeSet<String>szarmazasiHelyek=new TreeSet<>();

        for (Kigyo kigyo:kigyok){
            szarmazasiHelyek.add(kigyo.elofordulas);
        }

        System.out.printf("A kigyok szarmazasi helyei: ");
        int szamlalo=0;
        for (String i :szarmazasiHelyek){
            System.out.printf("%s",szamlalo==0 ? i:", "+i);
            szamlalo++;
        }
        System.out.println();
        ArrayList<Kigyo> mergesKigyok=new ArrayList<>();

        for (Kigyo kigyo:kigyok){
            if (kigyo.merges.equals("Igen")){
                mergesKigyok.add(kigyo);
            }
        }
        int randomNum = (int)(Math.random() * mergesKigyok.size());

        System.out.printf("Egy veleltlen kivalasztott merges kigyo: %s\nSzarmazasi helye: %s hossza: %s\n",mergesKigyok.get(randomNum).faj,mergesKigyok.get(randomNum).elofordulas,mergesKigyok.get(randomNum).hossz);

        TreeMap<String,Integer>kigyoFajok=new TreeMap<>();

        for (Kigyo kigyo:kigyok){
            String[]kigyoNev;
            kigyoNev=kigyo.faj.split(" ");
            if (kigyoNev.length<2){
                kigyoFajok.merge(kigyoNev[0],1,Integer::sum);
            }else {
                kigyoFajok.merge(kigyoNev[kigyoNev.length-1],1,Integer::sum);
            }
        }

        for (String i:kigyoFajok.keySet()){
            System.out.printf("%s: %s fele\n",i,kigyoFajok.get(i));
        }
        String utolsoMamba="";

        for (Kigyo kigyo:kigyok){
            if (kigyo.faj.toLowerCase().contains("mamba")){
                utolsoMamba=kigyo.faj;
            }
        }
        System.out.printf("Az utolso mamba fajtaja %s",utolsoMamba);

        PrintWriter ki = null;
        try {
            ki = new PrintWriter((new File("kobra.txt")));
            for (Kigyo eszkoz : kigyok){
                if (eszkoz.faj.toLowerCase().contains("kobra")){
                    ki.printf("%s (%s)\r\n",eszkoz.faj,eszkoz.hossz);
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