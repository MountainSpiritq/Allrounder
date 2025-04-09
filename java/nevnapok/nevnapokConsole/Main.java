package com.company;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {

    private class Nev {
        public String nev;
        public ArrayList<String> napok;

        public Nev(String sor){
            String[] s = sor.split(";");
            nev = s[0];
            napok = new ArrayList<>();
            for(int i = 1; i < s.length; i++) napok.add(s[i]);
        }
    }

    private ArrayList<Nev> nevek = new ArrayList<>();

    public Main(){
        //0. feladat
        betolt("nevnap.csv");
        System.out.printf("0) Összesen %d név beolvasva.\n", nevek.size());
        System.out.printf("A tizedik név %s akinek %d névnapja van.\n", nevek.get(9).nev, nevek.get(9).napok.size());

        //1. feladat
        System.out.printf("1) János névnapjai: ");

        int i = 0; while(i < nevek.size() && !nevek.get(i).nev.equals("János")) i++;
        if(i < nevek.size()){
            System.out.printf("1) János névnapjai: %s\n", String.join(", ", nevek.get(i).napok));
            //for(int j = 0; j < nevek.get(i).napok.size(); j++){
           //     if(j < nevek.get(i).napok.size() - 1) System.out.printf("%s, ", nevek.get(i).napok.get(j));
            //    else System.out.printf("%s", nevek.get(i).napok.get(j));
           // }
        }

        ArrayList<String> elseje = new ArrayList<>();

        //2. feladat
        System.out.printf("2) Április elsején van névnapja:");
        for(Nev nev : nevek){
            if(nev.napok.contains("0401")){
                System.out.print(nev.nev + " ");
            }
        }

        //3. feladat
        System.out.println("");

        int legtobb = nevek.get(0).napok.size();
        String leges = "";

        for(int x = 0; x < nevek.size(); x++){
            if(legtobb < nevek.get(x).napok.size()){
                legtobb = nevek.get(x).napok.size();
                leges = nevek.get(x).nev;
            }
        }

        System.out.printf("Legtöbb névnapja: (%d) %s nevűeknek van.\n", legtobb, leges );
        System.out.print("De ugyanannyi névnapja van még: ");
        for(Nev nev : nevek){
            if(nev.napok.size() == legtobb){
                if(!nev.nev.equals(leges)){
                    System.out.printf(nev.nev + " ");
                }
            }
        }
        System.out.println("");
        //4. feladat
        int ossz = 0;
        for(Nev nev : nevek){
            ossz += nev.napok.size();
        }

        System.out.printf(" 4) Összesen %d nap van a nevekhez rendelve.", ossz);
        System.out.println();

        //5. feladat
        String[] honapok = {"Január", "Febrár", "Március", "Április", "Májs", "Június", "Júlis", "Augusztus", "Szeptember", "Október", "November", "December"};
        TreeMap<String, Integer> stat = new TreeMap<>();
        for(Nev nev : nevek){
            for(String nap : nev.napok){
                String ho = nap.substring(0, 2);
                if(!stat.containsKey(ho)) stat.put(ho, 1);
                else { int eddig = stat.get(ho); stat.put(ho, eddig + 1); }
            }
        }
        System.out.printf(" 5) Az egyes hónapokban tartott névnapok száma:\n");
        for(String key : stat.keySet()){
            System.out.printf("   %s: %d\n", honapok[Integer.parseInt(key) - 1], stat.get(key));
        }

        //6. feladat
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(new File("elseje.txt"), "utf-8");
            for(Nev nev : nevek){
                for(String nap : nev.napok){
                    if(nap.substring(2,4).equals("01")){
                        ki.printf("%s: %s\r\n", nap, nev.nev);
                    }
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
            if(ki!=null){
                ki.close();
            }
        }

        System.out.printf(" 6) Elsejei névnapok kiírva az elseje.txt fájlba.");
    }


    private void betolt(String fajlnev){
        Scanner be = null;
        try {
            be = new Scanner(new File(fajlnev), "utf-8");
            while(be.hasNextLine()) nevek.add(new Nev(be.nextLine()));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally{
            if(be!=null){
                be.close();
            }
        }

    }

    public static void main(String[] args) {
	    new Main();
    }
}
