public class testCuenta{


    public static void main(String[] args){

        Cuenta cuentaVacia = new Cuenta();
        Cuenta cuentaSaldo = new Cuenta(1000);

        cuentaVacia.ingresar(200);
        cuentaSaldo.extraerSaldo(100);
        
        System.out.println("Cuenta 1: " + cuentaVacia.obtenerSaldo());
        System.out.println("Cuenta 2: " + cuentaVacia.obtenerSaldo());

        

    }
}