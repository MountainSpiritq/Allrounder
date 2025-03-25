import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    private class Allat{

       public String allatfaj;
       public int magagassag;
       public int suly;
       public int eletkor;

       public Allat(String sor){
           String[] s=sor.split(";");
           allatfaj=s[0];
           magagassag=Integer.parseInt(s[1]);
           suly=Integer.parseInt(s[2]);
           eletkor=Integer.parseInt(s[3]);
       }
    }

    private ArrayList<Allat> allatok =new ArrayList<>();

        String topAllatnev="";
        int topMagassag=0;
        int eletkorDarab=0;
        int eletkorOsszeg=0;
    public Main(){
        betolt("allatok.csv");
        System.out.println("//0.feladat");
        System.out.printf("Osszesen %d fele allatfaj adat lett beolvasva",allatok.size());
        allatok.forEach(allat -> {
            if(allat.magagassag>topMagassag){
                topMagassag=allat.magagassag;
                topAllatnev=allat.allatfaj;
            }
        });
        System.out.println("//1.feladat");
        System.out.println("A legmagasabb "+topAllatnev+" magassaga "+topMagassag);

        allatok.forEach(allat -> {
            if (allat.suly>20){eletkorDarab++; eletkorOsszeg+=allat.eletkor;}
        });
        System.out.println("a husz kilonal nehezebb allatok eletkora "+ (float)eletkorOsszeg/eletkorDarab);

        //3.feladat
        int sulyOszeg=0;
        for(Allat a:allatok) sulyOszeg+=a.suly;
        int sulyAtlag=sulyOszeg/allatok.size();
        Allat legkozelebbi=allatok.get(0);
        for(Allat a : allatok) if(Math.abs(a.suly-sulyAtlag)<Math.abs(legkozelebbi.suly-sulyAtlag))legkozelebbi=a;
        System.out.printf("az allat %dkg %s nevu legkzelebbi sulyu %d ",sulyAtlag,legkozelebbi.allatfaj,legkozelebbi.suly);

        //4.feladat

        System.out.println("Kettos betu van a neveben");

        for (Allat a : allatok){
            boolean van=false;
            for (int i = 0; i < a.allatfaj.length()-1; i++) {
                if (a.allatfaj.charAt(i)==a.allatfaj.charAt(i+1))van=true;
            }
            if(van) System.out.printf("   * %s\n",a.allatfaj);
        }
        //5.feladat TREE MAP NEEDED
        System.out.println("5.feladat");
        TreeMap<Integer,Integer> kategoriak=new TreeMap();

        for (Allat a:allatok){
            System.out.println(a.magagassag/50);
            int kategoria=a.magagassag/50;
            if(!kategoriak.containsKey(kategoria)){
                kategoriak.put(kategoria,1);
            }else{
                kategoriak.put(kategoria,kategoriak.get(kategoria)+1);
            }
        }
        System.out.println(kategoriak);
        for (Integer kategoria: kategoriak.keySet()){
            System.out.printf("   * %03d-%03dcm: %d darab\n",kategoria*50,kategoria*50+49,kategoriak.get(kategoria));
        }
        //6.feladat
        ArrayList<Integer> katArray=new ArrayList<>();
        for (Integer key:kategoriak.keySet())katArray.add(key);
        int v=(int)(Math.random()*katArray.size());
        int kat=katArray.get(v);
        System.out.printf("6) ebbol egy veletlen kategorian (%d-%dcm) eso allatok:\n",kat*50,kat*50+49);
        System.out.printf("   * ");
        ArrayList<String> fajtak=new ArrayList<>();

        for(Allat a:allatok){
            if(a.magagassag/50==kat){
                fajtak.add(a.allatfaj);
            }
        }
        System.out.printf("%s",String.join(", " ,fajtak));


        //7.feladat

        PrintWriter ki =null;
        try {
            ki=new PrintWriter(new File("kicsi.csv"),"utf-8");
            for(Allat a : allatok){
                if(a.magagassag<100){
                    ki.printf("%s;%d;%d;%d\r\n", a.allatfaj, a.magagassag, a.suly,a.eletkor);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (ki!=null)ki.close();
        }
    }
    private void betolt(String faljnev){
        Scanner be=null;
        try {
            be=new Scanner(new File(faljnev),"utf-8");
            be.nextLine();
            while (be.hasNextLine()){
                allatok.add(new Allat(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            if(be!=null){
                be.close();
            }
        }
    }

    public static void main(String[] args) {
        new Main();

    }
}