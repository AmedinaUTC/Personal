public class Cuenta{

    private float Saldo;

    public Cuenta(){
        Saldo = 0;
    }

    public Cuenta(float Saldo){
        this.Saldo = Saldo;
    }

    public void ingresar(float ingreso){
        Saldo += ingreso;
    }

    public float obtenerSaldo(){
        return Saldo;
    }

    public void extraerSaldo(float extra){
        if(extra > Saldo)
            return;
        
        Saldo -= extra;
    }


}