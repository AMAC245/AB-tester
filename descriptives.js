// higher-orders
const sum = sample => {
    return sample.reduce((prev, curr) => curr += prev);
};

//parseFloat for testing
const mean = sample => sum(sample) / sample.length


// factory function that returns the descriptive stats for a given sample

const descriptives = (control, treatment) => {
   // if (!Array.isArray(sample))
    if (Object.prototype.toString.call(sample) !== '[object Array]') {
        throw new Error ('samples must be an array')
    }
    
    return {
        population: sample.length,
        mean: mean(sample),
        sd: sd(sample),
        df: sample.length - 1
    }
}

// sample standard deviation
const sd = sample => {
    
    const calculateIndex = sample.map(index => {
        return (index - mean(sample)) ** 2
    });
    
    const sampleVariance = (sum(calculateIndex)) / (sample.length - 1)
    
    return Math.sqrt(sampleVariance)
}

// determines whether the two sample variances are equal or not
const f_statistic = (control, treatment) => { 
    if( arguments.length === 2 ) {
        
        
        
        const dfx = control.length -1
        const dfy = treatment.length -1 
        
        const key = [dfx, dfy]
        const crit_value = f_table[key] 
        
       
        const f_stat = 
             return sd(control) > sd(treatment)
                ? sd(control) / sd(treatment)
                : sd(treatment) / sd(control)
    
         return f_stat > crit_value 
                ? 'unequal' 
                : 'equal'
    } else {
        return 'not applicable - only required with two samples'
    }
    
}

if (f_statistic === 'unequal' ) {
    (descriptives(control).mean - descriptives(treatment).mean)
}    


// effect size 
if ( twoSample === true ) {
    const sd_pooled = (control, treatment) => {
        const val = ( sd(control)**2 + sd(treatment)**2 ) / 2
        return Math.sqrt(val)
    }

    const effect_size = () => {
        return (mean(treatment) - mean(control)) / sd_pooled
    }
}
    
    
export default descriptives



/* Although this works, string conversion may be susceptible to bugs:

function f_crit() {
    const f = f_stat.toString()
    if (keys.includes(result)) {
        const key = keys.indexOf(f)
        return values[key]
    } 
}
*/

// Determines whether the samples are equal or unequal
// Deep comparison that checks the dataset and returns the correct value from f-table
const variance = (control, treatment) => {
    const df_control = 2
    const df_treatment = 3
        
    const index = keys.findIndex((value, key) => {
        if ( value[0] === df_control && 
             value[1] === df_treatment ) {
            return key
        } 
    });
    
    return f_stat > values[index] 
         ? descriptives.variance = 'unequal' 
         : descriptives.variance = 'equal'    
}
console.log(variance())
// it must get each samples df
// needs to round df samples to closest
// if greater than 1000, return static 





const compare = (ctrl, trtmt) => {


    const f_test = (ctrl, trtmt) => {
        const f_stat = sd(ctrl) > sd(trtmt)
            ? sd(ctrl) / sd(trtmt) 
            : sd(trtmt) / sd(ctrl) 
    
        ctrl.df = descriptives(ctrl).df
        trtmt.df = descriptives(trtmt).df
        
        const index = keys.findIndex((value, key) => {
            if (
              value[0] === ctrl.df && 
              value[1] === trtmt.df
            ) {
                return key
            }
        })
            
        return f_stat < values[index]
            ? descriptives.variance = 'equal'
            : descriptives.variance = 'unequal'
    }
    

    return f_test(ctrl, trtmt)
}





const t_test = (control, treatment) => {

    const t_stat = () => {
        const mean_diff = mean(control) - mean(treatment)
        const sd_util = (sample) => sd(sample) / descriptives(sample).population
        
        let sd_diff = sd_util(control) + sd_util(treatment)
        
        // Catches if negative number and converts
        if (sd_diff < 0) {
            sd_diff = Math.abs(sd_diff)
        }

        return mean_diff - Math.sqrt(sd_diff)
    }
    
    return t_stat()
    
}
t_test(control, treatment)



//working variance equation
const variance = sample => {
    const conversion = sum(sample) ** 2 / sample.length
    const indices = sample.map(value => value ** 2)
    
    return (sum(indices) - conversion) / (sample.length -1)
}





const t_test = (ctrl, trtmt) => {
    const sd_util = sample => {
        return variance(sample) / descriptives(sample).population
    }

    const t_stat = (mean(ctrl) - mean(trtmt)) / 
                   (Math.sqrt(sd_util(ctrl) + sd_util(trtmt)))

    const _df = (sd_util(ctrl) + sd_util(trtmt)) ** 2 /
                (((sd_util(ctrl) ** 2) / descriptives(ctrl).df) +
                ((sd_util(trtmt) ** 2) / descriptives(trtmt).df))
    
    return Math.round(_df)
}
