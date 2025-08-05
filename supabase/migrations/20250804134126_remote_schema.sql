alter table "public"."users" drop column "stripe_customer_id";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.decrement_product_quantity(product_id bigint, quantity bigint)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  update product
  set "maxQuantity" = "maxQuantity" - quantity
  where id = product_id and "maxQuantity" >= quantity;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Check if avatar_url is null or empty and set default
  IF NEW.raw_user_meta_data->>'avatar_url' IS NULL OR NEW.raw_user_meta_data->>'avatar_url' = '' THEN
    NEW.raw_user_meta_data = jsonb_set(
      NEW.raw_user_meta_data,
      '{avatar_url}', 
      '"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"'::jsonb
    );
  END IF;
  
  -- Insert into public.users table
  INSERT INTO public.users (id, email, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'avatar_url');
  
  RETURN NEW;
END;
$function$
;


