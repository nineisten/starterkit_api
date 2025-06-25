
import {z} from "zod"


///user validation schemas
export const validateEmail = z
        .string()
        .email('invalid email address')
export const validateEmail_null = z
        .string()
        .email('invalid email address')
        .nullable()


export const validateUUID = z
        .string()
        .uuid()

//nullable uuid
export const validateUUID_null = z
        .string()
        .uuid()
        .nullable()

export const validateName= z
        .string()
        .min(2,'Name is required')
        .regex(/^[A-Za-z\s]+$/,'Name must contain only alphabetic character')

export const validateUsername=z
        .string()
        .min(3,'Username is required')
        .max(24,'Username can not exceed 24 characters')
        .regex(/^[a-z0-9_-]+$/,'Username must only contain lowercase letters, numbers, underscore or hyphen characters')

export const validateUsername_null = z
        .string()
        .min(3,'Username is required')
        .max(24,'Username can not exceed 24 characters')
        .regex(/^[a-z0-9_-]+$/,'Username must only contain lowercase letters, numbers, underscore or hyphen characters')
        .nullable()

export const validateSocials = z
        .array(z
        .string()
        .min(1,'Social handle can not be empty')
        .regex(/^[a-zA-Z0-9._-]+$/, 'Each social handle must contain only letters, numbers, periods, underscores or hyphens'))
        .optional()

//permissions validation schema 
export const validateRole = z
        .string()
        .min(3,'Role name is required')

export const validateCode = z
        .number()
        .int()
        .min(4,'Role code must be a minimum of 4 digits')
        .positive('code must be a positive number')

export const validateExpiration = z
        .date()
        .nullable()

//General validations
export const validateId = z
        .number()
        .int()
        .positive('Invalid Identifier')

export const validateLabel = z
        .string()
        .min(3,'Label must have 3 or more characters')
        .max(50,'Label cant exceed 50 characters')

export const validateDescription = z
        .string()
        .max(150,'Label can not exceed 150 characters')
        .nullable()
        
export const validateDescriptionRequired = z
        .string()
        .max(150,'Label can not exceed 150 characters')
        
export const validateCurrency = z
        .number({invalid_type_error:'Amount must be a number'})
        .positive('Value must be geeater than 0')
        .refine((value)=>{
            const dec = value.toString().split('.')[1]?.length||0
                return dec <= 2;
        },{
            message:'Value must have, at most, 2 decimal places'
        })

export const validateCurrencyCode = z
        .string()
        .length(3,'Curreny code should be no more or less than 3 characters')
        .regex(/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters (e.g., USD, EUR)')

//validate 
export const validateString_50 = z
    .string()
    .min(3,'Input must have more than 3 characters')
    .max(50,'Input can not exceed 50 characters')

export const validateString_50_nullable = z
    .string()
    .min(3,'Input must have more than 3 characters')
    .max(50,'Input can not exceed 50 characters')
    .nullable()

export const validateString_100 = z
    .string()
    .min(3,'Input must have more than 3 characters')
    .max(100,'Input can not exceed 100 characters')

export const validateString_100_nullable = z
    .string()
    .min(3,'Input must have more than 3 characters')
    .max(100,'Input can not exceed 100 characters')

export const validateUrl = z
    .string()
    .url()

export const validateImageLink = z
    .string()
    .url('Must be a valid URL')
    .refine(
        (value) => {
        // Check for common image extensions
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(value);
        },
        { message: 'URL must point to an image file (jpg, jpeg, png, gif, or webp)' })
    .nullable()

export const validatePostBody= z
  .string()
  .min(10, 'Blog post body must be at least 10 characters long')
  .max(10000, 'Blog post body cannot exceed 10,000 characters')
  .refine(
    (value) => value.trim().length > 0,
    { message: 'Blog post body cannot be empty or only whitespace' })

