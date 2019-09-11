Filtering Data will be filtered by levels of swear words:

Profanities
Profanities strict
Profanities very strict

Blacklists will be split further into likelyhood of fitting into classification categories:

Sexist
Racist
Homophobic
General

Crowdsourcing form

Try to not use google forms.

# 24-06 Re: Annotation Tool

Notes field in annotation

Session guidelines field
Confidence on annotation

Feedback (Is context useful)

4 Annotators

Active learning exploration/exploitation bias Epsilon greedy sampling

Query by commitee/Uncertainty sample, bagging

50/50 chance of getting

# 01-07 Frontend Notes

[JS to read in n lines in a file](https://stackoverflow.com/questions/39479090/read-n-lines-of-a-big-text-file)

# 11-09 Lit review starts

Ines Montani on Prodigy FAQ (https://www.youtube.com/watch?v=tMAU3gLbKII)

Binary tasks are easier to process => give users option to split classification into multiple binary tasks
  [car, boat, train] becomes -> [car, not car], [boat, not boat], [train, not train]
  results can then be combined in multiple ways to optimise results

Noise removal model for pre-filtering before getting specific
  for final model predicting [car,boat,train], start with a model that predicts [vehicle, not vehicle]

Prodigy - training an insults classifier: https://www.youtube.com/watch?v=5di0KlKl0fE&list=PLBmcuObd5An56EbwRCtNWW9JnUckO7Xp-

Use [gpython](https://github.com/go-python/gpython) to provide a REPL for data conversion from the browser
 Possible alternative is [grumpy](https://github.com/grumpyhome/grumpy) which compiles python code to Go, making it faster for bigger datasets.
 (perhaps give the 2 options?)