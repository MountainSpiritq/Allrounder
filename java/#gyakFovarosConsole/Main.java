import java.io.File;
import java.io.FileNotFoundException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    private class Fovaros {
        String orszagNev;
        String rovidites;
        int    orszagLak;
        String  fovarosNev;
        int fovarosLak;

        public Fovaros(String sor){
            String[] s = sor.split(";");
            orszagNev = s[0];
            rovidites = s[1];
            orszagLak = Integer.parseInt(s[2]);
            fovarosNev = s[3];
            fovarosLak = Integer.parseInt(s[4]);
        }
    }

    ArrayList<Fovaros> fovarosok = new ArrayList<>();

    private void betolt(String fajlnev){
        Scanner  be = null;
        try{
            be = new Scanner(new File(fajlnev));
            be.nextLine();
            while(be.hasNextLine()){
                fovarosok.add(new Fovaros(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally{
            if(be != null) be.close();
        }
    }

    public Main(){
        betolt("fovaros.csv");
        System.out.printf("%s orszag adata beolvasva\n",fovarosok.size());
        String legtobbenElnek="";
        int lakossag=0;
        for (Fovaros varos:fovarosok){
            if (varos.orszagLak>lakossag){
                lakossag=varos.orszagLak;
                legtobbenElnek=varos.orszagNev;
            }
        }

        String masodikLegtobbenElnek="";
        int masodikLakossag=0;

        for (Fovaros varos:fovarosok){
            if (varos.orszagLak>masodikLakossag && varos.orszagLak!=lakossag){
                masodikLakossag=varos.orszagLak;
                masodikLegtobbenElnek=varos.orszagNev;
            }
        }

        //hasznos formazas szamokhoz
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setGroupingSeparator(',');

        DecimalFormat formatter = new DecimalFormat("#,###", symbols);
        String formatted = formatter.format(lakossag);

        System.out.printf("Ahol a legtobben elnek %s , %s fo\n",legtobbenElnek,formatted);

        String formatedSecond=formatter.format(masodikLakossag);

        System.out.printf("Ahol a masodik legtobben elnek %s , %s fo\n",masodikLegtobbenElnek,formatedSecond);

        int budapestLak=0;
        for (Fovaros varos:fovarosok){
            if (varos.fovarosNev.equals("Budapest")){
                budapestLak=varos.fovarosLak;
            }
        }
        int kevessebbMintPest=0;
        for (Fovaros varos:fovarosok){
            if (varos.fovarosLak<budapestLak){
                kevessebbMintPest++;
            }
        }
        System.out.printf("%s fovarosban elnek kevesebben mint budapesten\n",kevessebbMintPest);
        System.out.printf("Orszagjel amiben szerepel a 'C' betu: ");
        for (Fovaros varos : fovarosok) {
            if (varos.rovidites.contains("C")) {
                System.out.printf("%s, ", varos.rovidites);
            }
        }

        int huszmillaAlatt=0;
        for (Fovaros varos:fovarosok){
            if (varos.orszagLak<20000000){
                huszmillaAlatt+= varos.fovarosLak;
            }
        }
        String formatedNum=formatter.format(huszmillaAlatt);
        System.out.printf("\nA 20milla alatt levo orszagok fovarosainak nepessege %s fo\n",formatedNum);

       //hell naw inbound
        TreeMap<Integer,Integer> varosokOtMil=new TreeMap<>();

        for (int i = 0; i < 30000001; i+=5000000) {
            varosokOtMil.merge(i,0,Integer::sum);
        }

        for (Object i:varosokOtMil.keySet().toArray()){
            for (Fovaros varos:fovarosok){
                if (varos.fovarosLak>=(Integer)i && varos.fovarosLak<(Integer)i+5000000){
                    varosokOtMil.merge((Integer)i,1,Integer::sum);
                }
            }
        }

        for (Object i:varosokOtMil.keySet().toArray()){
            String tempBs=formatter.format((Integer)i+4999999);
            String tempIBs=formatter.format((Integer)i);
            if (varosokOtMil.get(i)!=0){
                System.out.printf("%s - %s: %s\n",tempIBs,tempBs,varosokOtMil.get(i));
            }
        }

    }

    public static void main(String[] args) {
        new Main();
    }
}