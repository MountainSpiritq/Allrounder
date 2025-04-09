import com.sun.source.tree.Tree;

import java.io.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    private class Eszkoz {
        String nev;
        int beszerzesEv;
        int darab;
        int egysegAr;

        public Eszkoz(String sor){
            String[] s = sor.split(";");
            nev = s[0];
            beszerzesEv = Integer.parseInt(s[1]);
            darab = Integer.parseInt(s[2]);
            egysegAr = Integer.parseInt(s[3]);
        }
    }

    ArrayList<Eszkoz> eszkozok = new ArrayList<>();

    private void betolt(String fajlnev){
        Scanner be = null;
        try{
            be = new Scanner(new File(fajlnev));
            be.nextLine();
            while(be.hasNextLine()){
                eszkozok.add(new Eszkoz(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally{
            if(be != null) be.close();
        }
    }

    public Main(){
        betolt("leltar.csv");

        // 0. Feladat
        int osszeg = 0;
        for (Eszkoz eszkoz : eszkozok) {
            osszeg = osszeg + eszkoz.egysegAr * eszkoz.darab;
        }

        System.out.println("0) A beolvasott leltári tételek száma: " + eszkozok.size() + "\nA benne lévő eszközök összára: " + osszeg + ",-Ft");

        // 1. Feladat
        int legDragabbAr = 0;
        String legDragabb = "";
        for (Eszkoz eszkoz : eszkozok) {
            if(eszkoz.egysegAr > legDragabbAr){
                legDragabb = eszkoz.nev;
                legDragabbAr = eszkoz.egysegAr;
            }
        }

        System.out.println("1) A legdrágább eszköz: " + legDragabb + " (" + legDragabbAr + ",-Ft)");

        // 2. Feladat
        ArrayList<Integer> evek = new ArrayList<>();
        for (Eszkoz eszkoz : eszkozok) {
            if(!evek.contains(eszkoz.beszerzesEv)) evek.add(eszkoz.beszerzesEv);
        }
        evek.sort(null);

        System.out.println("2) A leltár a " + evek.get(0) + "-" + evek.get(evek.size()-1) + " éveket tartalmazza");

        // 3. Feladat
        TreeMap<Integer, Integer> vasarlasok = new TreeMap<>();
        for (Eszkoz eszkoz : eszkozok) {
            if(!vasarlasok.containsKey(eszkoz.beszerzesEv)){
                vasarlasok.put(eszkoz.beszerzesEv, eszkoz.darab);
            } else {
                vasarlasok.put(eszkoz.beszerzesEv, vasarlasok.get(eszkoz.beszerzesEv) + eszkoz.darab);
            }
        }

        for(int i = evek.get(evek.size()-1); i > evek.get(0); i--){
            if(!vasarlasok.containsKey(i)){
                vasarlasok.put(i, null);
            }
        }

        System.out.println("3) Az egyes években vásárolt eszközök darabszáma:");
        for(Map.Entry<Integer, Integer> vasarlas : vasarlasok.entrySet()){
            Integer beszerzes = vasarlas.getKey();
            Integer darab = vasarlas.getValue();
            System.out.println(beszerzes + " : " + (darab != null ? darab + " darab eszköz" : "Nincs eszköz"));
        }

        // 4. Feladat
        TreeMap<Integer, Integer> vasarlasErtekek = new TreeMap<>();
        for (Eszkoz eszkoz : eszkozok) {
            if(!vasarlasErtekek.containsKey(eszkoz.beszerzesEv)){
                vasarlasErtekek.put(eszkoz.beszerzesEv, eszkoz.darab * eszkoz.egysegAr);
            } else {
                vasarlasErtekek.put(eszkoz.beszerzesEv, vasarlasErtekek.get(eszkoz.beszerzesEv) + eszkoz.darab * eszkoz.egysegAr);
            }
        }

        int legjobbEv = 0;
        int legnagyobbErtek = 0;

        for(Map.Entry<Integer, Integer> vasarlas : vasarlasErtekek.entrySet()){
            Integer ev = vasarlas.getKey();
            Integer ertek = vasarlas.getValue();
            if(ertek > legnagyobbErtek){
                legnagyobbErtek = ertek;
                legjobbEv = ev;
            }
        }

        System.out.println("4) A legnagyobb összértékű beszerzés éve: " + legjobbEv + "\nEkkor a beszerzés összértéke: " + legnagyobbErtek + ",-Ft");

        // 5. Feladat
        int legnagyobbBeszerzesErtek = 0;
        String legnagyobbBeszerzesEszkoz = "";
        int legnagyobbBeszerzesDarab = 0;

        for(Eszkoz eszkoz : eszkozok){
            if(eszkoz.darab * eszkoz.egysegAr > legnagyobbBeszerzesErtek){
                legnagyobbBeszerzesEszkoz = eszkoz.nev;
                legnagyobbBeszerzesErtek = eszkoz.darab * eszkoz.egysegAr;
                legnagyobbBeszerzesDarab = eszkoz.darab;
            }
        }

        System.out.println("5) A legnagyobb értékű beszerzés:\n"+legnagyobbBeszerzesDarab + " darab " + legnagyobbBeszerzesEszkoz + " = " + legnagyobbBeszerzesErtek + ",-Ft");

        // 6. Feladat
        PrintWriter ki = null;
        try {
            ki = new PrintWriter((new File("kezdes.txt")));
            for (Eszkoz eszkoz : eszkozok){
                if(eszkoz.beszerzesEv == evek.get(0)){
                    ki.write(eszkoz.darab + " x " + eszkoz.nev + " = " + eszkoz.darab * eszkoz.egysegAr + ",-Ft\r\n");
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

    // printf + %,d az ezres elválasztáshoz

    public static void main(String[] args) {
        new Main();
    }
}
