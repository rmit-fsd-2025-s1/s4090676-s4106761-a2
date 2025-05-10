import { z, ZodType } from "zod";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";

/**
 * Create a form with a validation schema
 * Intended to be used with hooks
 * @param onSubmit
 * @param schema must be a Zod schema
 * @param children various Fields from ./hookform
 * @param resetOnSubmit cause the form to reset to default values after validation and submission
 * @param defaults the default data to render in the form
 */
export function ZodForm<S extends ZodType>({
  onSubmit,
  schema,
  children,
  resetOnSubmit,
  defaults,
}: {
  onSubmit?: (data: z.infer<S>) => void;
  schema: S;
  children: ReactNode;
  resetOnSubmit?: boolean;
  defaults?: DefaultValues<z.TypeOf<S>>;
}) {
  const methods = useForm<z.infer<S>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const onSubmitProxy = (event?: React.BaseSyntheticEvent) =>
    methods.handleSubmit((data) => {
      if (onSubmit) onSubmit(data);
      if (resetOnSubmit) methods.reset(defaults);
    })(event);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmitProxy}>{children}</form>
    </FormProvider>
  );
}
