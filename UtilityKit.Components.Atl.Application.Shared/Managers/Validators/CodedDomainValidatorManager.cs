//using FluentValidation;
//using UtilityKit.Components.Atl.Application.Errors.Design;

//namespace UtilityKit.Components.Atl.Application.Shared.Managers.Validators
//{
//    public static class CodedDomainValidatorManager
//    {
//        public static IRuleBuilderOptions<T, Guid> ValidateCodedDomainId<T>(this IRuleBuilder<T, Guid> ruleBuilder)
//        {
//            return ruleBuilder
//                .NotEmpty()
//                    .WithMessage(CodedDomainErrors.EMPTY_ID);
//        }

//        public static IRuleBuilderOptions<T, string> ValidateCodedDomainNameIsValid<T>(this IRuleBuilder<T, string> ruleBuilder)
//        {
//            return ruleBuilder
//                .NotEmpty()
//                    .WithMessage(CodedDomainErrors.EMPTY_NAME)
//                .Must(x => !x.Contains("'") && !x.Contains("`"))
//                    .WithMessage(CodedDomainErrors.INVALID_NAME);
//        }
//    }
//}
