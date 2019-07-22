import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { empty } from 'rxjs';

export class userValidators{
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null{
            if((control.value as string).indexOf(' ')>=0){
                return { cannotContainSpace:true};
                // return { minlength:{
                //     requiredLength: 10,
                //     actualLength: control.value.length
                // }

                }
                return null;
            }
    static shouldBeUnique(control: AbstractControl): ValidationErrors | null{
        
        setTimeout(()=>{},1000);
            
        if(control.value == 'mosh')
        {
            // console.log(control.value);
            return ({shouldBeUnique: true})
        }
        else 
            return (null)
        
  
               
    }

    static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        
        if(control.value!==null || control.value!=undefined)
        {
            console.log(control.value!==null);
        const password: string = control.root.get('password').value; // get password from our password form control
        const confirmPassword: string = control.root.get('conpassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password == confirmPassword) 
        {
            console.log(confirmPassword);
            
            return (null)
            }
        else 
        {
            return ({passwordMatchValidator: true}) 
            
        }
           
          // if they don't match, set an error in our confirmPassword form control
        //   control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }  
        
      }

}

