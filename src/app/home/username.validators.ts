import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators{
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
        
        
    //     return new Promise((resolve)=>{
           
                
    //             if(control.value==='mosh')
    //             {
                    
                    
    //                 resolve({shouldBeUnique: true});
    //             }
    //              else
    //             {
    //                 resolve(null);
    //             }
                   
            
          
            
    //     }
    //     );

    // }
               
    }
}
