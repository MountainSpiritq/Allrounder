import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;
import java.util.TreeSet;

public class Main {

    private class Film {
        String cim;
        int ev;
        int kocka;
        String szines;

        public Film(String sor){
            String[] s = sor.split(";");
            cim = s[0];
            ev = Integer.parseInt(s[1]);
            kocka=Integer.parseInt(s[2]);
            szines = s[3];
        }
    }

    ArrayList<Film> filmek = new ArrayList<>();

    private void betolt(String fajlnev) {
        Scanner be = null;
        try {
            be = new Scanner(new File(fajlnev), "utf-8");
            be.nextLine();
            while (be.hasNextLine()) filmek.add(new Film(be.nextLine()));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            if (be != null) {
                be.close();
            }
        }
    }
    public Main(){
        betolt("diafilm.csv");
        int feketeCounter=0;
        System.out.printf("%s diafilm beolvasva\n",filmek.size());

        for (Film film:filmek){
            if (film.szines.equals("N")){
                feketeCounter++;
            }
        }

        System.out.printf("Kozoluk %s meg fekete-feher\n",feketeCounter);

        //1. feladat
        int legrebbi=9999;
        TreeSet<String>regiFilmek=new TreeSet<>();

        for (Film film :filmek){
            if (film.ev<legrebbi){
                legrebbi=film.ev;
            }
        }

        for (Film film:filmek){
            if (film.ev==legrebbi){
                regiFilmek.add(film.cim);
            }
        }
        System.out.printf("A legregebbi diafilm a: %s (%s)\n",regiFilmek.first(),legrebbi);

        System.out.println("Ugyanebben az evben keszult meg:");
        for (int i = 1; i < regiFilmek.size(); i++) {
            System.out.printf("- %s (%s)\n",regiFilmek.toArray()[i].toString(),legrebbi);
        }
        //2. feladat

        float ketezerElott=0;
        int ellott=0;
        float ketezerUtan=0;
        int utan=0;

        for (Film film:filmek){
            if (film.ev<2000){
                ketezerElott+=film.kocka;
                ellott++;
            }else{
                ketezerUtan+=film.kocka;
                utan++;
            }
        }

        System.out.printf("A 2000 elott keszult diafilmek atlagos kockaszama: %.1f\n",ketezerElott/ellott);
        System.out.printf("A 2000 utan keszult diafilmek atlagos kockaszama: %.1f\n",ketezerUtan/utan);

        //3.feladat
        TreeMap<Integer,Integer> evTizedek=new TreeMap<>();
        int legnagyobbTized=0;
        int legkisebbTized=9999;

        for (Film film:filmek){
            if (film.ev/10<legkisebbTized){
                legkisebbTized= film.ev/10;
            }if(film.ev/10>legnagyobbTized){
                legnagyobbTized=film.ev/10;
            }
        }

        System.out.println("Az egyes evtizedekben keszult filmek szama: ");
        for (int i = legkisebbTized; i <legnagyobbTized+1; i+=1) {
           if (!evTizedek.containsKey(i)){
               evTizedek.put(i, 0);
           }
        }

        for (Film film:filmek){
            if (evTizedek.containsKey(film.ev/10)){
               evTizedek.merge(film.ev/10,1 ,Integer::sum);
            }
        }

        for (Object i:evTizedek.keySet().toArray()){
            System.out.printf("%s - %s : %s darab\n",(Integer)i*10,(Integer)i*10+9,evTizedek.get(i).toString());
        }

        TreeMap<Integer,Integer>evekKocka=new TreeMap<>();

        for (Film film:filmek){
            evekKocka.merge(film.ev,film.kocka,Integer::sum);
        }

        int legtobbKocka=0;
        int masodikLegtobbKocka=0;

        for (Object i:evekKocka.keySet().toArray()){
            System.out.println(i);
            if ((Integer)evekKocka.get(i)>legtobbKocka){
                legtobbKocka=(Integer)evekKocka.get(i);
            }else if ((Integer)evekKocka.get(i)>masodikLegtobbKocka && (Integer)evekKocka.get(i)!=legtobbKocka){
                masodikLegtobbKocka=(Integer)evekKocka.get(i);
            }
        }
        System.out.printf("%s, %s",legtobbKocka,masodikLegtobbKocka);

    }


    public static void main(String[] args) {
        new Main();
    }
}