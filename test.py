from src.re import RuleEngine

engine = RuleEngine("config/rules.yaml")

scores = [-1.5, -0.2, 0.5, 1.3, 2.4]

for score in scores:
    result = engine.apply_financial_capacity(score)

    print(f"\nScore: {score}")
    print(result)
