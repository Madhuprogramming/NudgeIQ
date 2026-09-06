import random
import yaml


class RuleEngine:

    def __init__(self, yaml_path):
        with open(yaml_path, "r") as file:
            self.rules = yaml.safe_load(file)

    def get_family(self, family_name):
        return self.rules["rule_families"][family_name]

    def apply_financial_capacity(self, stability_score):

        rules = self.get_family("financial_capacity")

        for rule in rules:

            condition = rule["condition"]

            min_score = condition["min_score"]
            max_score = condition["max_score"]

            lower_ok = min_score is None or stability_score >= min_score

            upper_ok = max_score is None or stability_score <= max_score

            if lower_ok and upper_ok:

                outputs = rule["outputs"]
                # Sample monthly investment capacity
                investment = random.randint(
                    outputs["monthly_investment_capacity"]["min"],
                    outputs["monthly_investment_capacity"]["max"],
                )

                # Calculate SIP as 50–60% of investment capacity
                sip_percentage = random.uniform(0.50, 0.60)
                sip = int(investment * sip_percentage)

                return {
                    "rule_id": rule["id"],
                    "level": rule["level"],
                    "investment_capacity": investment,
                    "recommended_sip": sip,
                    "sip_percentage": round(sip_percentage * 100, 1),
                    "emergency_buffer_months": outputs["emergency_buffer_months"],
                }

        return None
