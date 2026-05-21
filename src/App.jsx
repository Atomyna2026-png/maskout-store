import { useState, useEffect, useRef } from "react";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap";

// ─── Logo Assets ───
const LOGO_NAV = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABQCAYAAACkoQMCAAAdXElEQVR42tV8eXxUVZr2+557b1VlT63Z90AghM0EWaUMBAKyLxFQURtQ9AOHUWhtp50uC1uFT7GlQcXuVlyG/qYtVDY3HJWgCAgoKhCU0Mq+hGxQWaruPeedP3IrFiFJVYCeb/r8fvknVXXuOc/7vPs5F6D9IQEAMMbghRdeSJsyfcpMZ3HxkhElJYtLx5bOm3PvvcOJyBj8/bKyMqm9iZxOpwwAsHbt2sT58+dn6v/GwOdEhADAAAB+85vfFK5atcoKAOByuRh0cRQWFioAALfddtukQUMGf7thw4YYfW6E6zAkAICHH36414CBA17P6ZZbnZyaQgnJSZSYnERJKcmUnplBPXv2POh0Oh9/4oknshAve67sdDplHRBZ33xEUVHRt06n89fBYAXAVBQFJkyY8EBOTk5zYWHhJ0Qk6+vAroIyY8aMsTk5OZesdhsNGz58DSK2Pi/U0IXB2hOvDAAwedrkOd26d2uy2m1ksVnJardxq92m6X/cYrOSxWqlhMREysrO9hbdeOPau++5e4jJZLpsOsYYLF22tGfv3r2/zMrMokWLFvUMABJY7Me7d1sHDxn8VnJqCsWb4zVHQgINGTbkFUmSwt4QACgAALfOmjUzKyebmy0Wstisalp6Os2YNm1SMHChCHHFCEhvbOnYBWkZ6RRvMZPNYVdtDruwOex0xV+Cg1vtNtVis5I9wUHpmRlU0LfPviHDhjwzceLEX48ZM+aRgYMHv5adm+O12+1007BhLzPGAgtEAIB77rnHWVBQUGlz2Mlis6r2BIew2Kz+lNRUmjBhwgPB7OpgIADIiAgTJkyYm56RIcxWi7AnOLg9wS7MVgvPy8urXfrYY906AkdniQQAMHv27JLbb799/hWgzJw5c0xmVibFW8yaPcHB2wXkyj9hc9g1i80qLDYrORITKDk5mZKSksjucFBsfBz1zO95dN26dWYAMOiqxUpGl/wuMyuTmy2WgADI5rCTPcEh4i1mLTsnW1344MIbg9fXHu0ZYzBu3LhH0jMyyGy1cHuCI1iQ3GqzUl7PvB+eeuqp7m3Y0aqqBoMBSktL5/Xp24emTp1a2oK4Cxi4AdauXRu77P8uP3Du/LlkRVaIiNhV2CcBAIKIABFJ0zSyWq3KTUOHOV977bXPAQAWL16c/2n5tjVnzpy+ydfsI1mW23sW54JLSYnJFe9t3nxDVlaWqs9NAaA8Hg83Go0wcODgP1T+/ci/NjU1cVmWmW7ML1uTEILZbLbz+b0K/vXd9evfliTJHwBk3rx5N+7dt++3J06emJiRlr52165dc6ZNmyah0+mUy8vLNafTuazih8OPcM41RJSvxXrroIioqCip/w2F8zdv2PAnIsIJEyY8WPHDYXdtbW00ImqMMZmI2p2DiDRJkuRePfNXbNu2bcn06dMlj8fDA+s9evRo3O233/4fPx87Nt6v+jVJkjqcCwAE55xFRkZCdHTUj3HRsT8gY1pDQ0N2g7ehb219HSQlJZ782wcf9umTkVHvcrlaqPTOO+9YH/23R4+er6qKleVWTCjInXbF3XFN01hcXBzmZucs+uSTT/64cOHCvjt27vzD2TNnipuam7gsyxwRlXakG2w8SONcmM1mmDJpcr8VK1YczM3NNVRWVvqefPLJHp6313uOHz9eIITQFEVhoRiOiMQ5JwBgiAjYQm3gnPO42Fhp2KBhE/76t79uCbBRAgBobmiY8vOx47dxITi1fJkJIVAIgfriBSJy3S23txkCRCGEICKSrDarVlRYOO+D9z94edy4cQ/t3LnzzdNnz+QJwSEiIoIRkcQ5R0SkTkBHxhg1NzdLtbV1WefOnVtXXV3N586de8uW99/bePz48azo6GiIiopiTU1NiIgihABRHwIRBSASImqSJClZmVlvfrj1w+XDhw+X33//fQ6BOONU1flBfq4RCYEmU4QUEx19NiYmpooTgffSJUdzc3NCs9/HNFUFRARE5MGMIiIJEaVIUwTYHfYdI4pH3Pvss88eGTx0sOeb/fune71eiI2NBYfDviExKfGDupq6HidPnVx0yetljLHOwJGISJw/f27s7LvvHnnhwrnsT7d99nJ1dTU6HI663r0K5mRmZp7a+snHb5w7ey4PAHiHbjcoitBREpqmyTabrWr+kiUPfjl1Krv55ptFeXl5SzAmSRIQiSy/qqI5Lk7t07f3Q6/++dXX0tLSLhIRHDx4MM795JM3nDj206Sqqgu31NfXd+OcS0IIAASQmARGo7HJHBe/Kys9/ZUNmzevGzd5Srd+N/Q/cPr06e5+VdUcDnvjDf1vuHP9+vUb+V4OAACz7rjjsx1ffO7xer0KY6wjJgJjDBubmujz7eWbfT5fhNfrhbS0tJ9LRoycsnLlyv0AAB9//PHQxb9e8uGpU6eKdOaEdBxCCDKZTFJutxz3XVOnVjudTtntdmut9DIoCuT37fPpyZMniwcUFj3wwXvvre5oMiJS7nvggfxjlZXdvY2NZklGYY41nx04cOABl8v1s9/vh1tnzSrd/83Xb124cCGWBPnizfEwZnRp6UsvvVQOAIrT6aRTp05JlZWVvpEjRz5+sOKQS1VVjohSJzoAqqoSYwzTMzL2/mr+XVMW3bvoZCDGKS8v115++eWkZ1es2Huh+kKiJEnQGTg6W1hCYuKxigMHeyCiX9eAX6y3oijQt3+/TzKys7xEFAEAUps8BfU4IqSnmjJlyp3ZuTki3mImq93mS05JofHjxy8BAMjPzze0zY+O7t0b1617t2qz1UIdBpIOO1ntNm5PTKCBgwZ+VFVRFdM2tgkEbhMnTpyTkpZKVrtN6yz2stptamJSEo0YMeJ3nQaRvfr0Wds9v8fPBkUJ6YldLhcL5EJOp1POHZNrRECYPn36/PTMDIq3mLk9waGabRbq3af3wU7yHgkRoVdBr43WlgV3tBnNYrNSn359d+pzXZFgBjxnRVVVTLe87uctNmunQFtsVpGemcEXLFjQO0jwVxqi5ISELyIUY6zP7w+lm+R2u0V5eblWXl6uORwOqvyw0jd+8qRbv9q7Z82lS5eEoigohACT0QQpySkrEVFzOp14GU11kIkIjUbjRQwKD9p7JmMMFEmuREQNAGS32y3aumIAwN5JSZcMJlOlbs1FR+YFEdFoNB5dvXr1IQAgj8cj2gUmPz//bYfD8fXy5ctj2pYFOhoBf3/vggWDDx08sO7ixYtClmUkIhBCyCaTqWH8+PGbAABuvvnmjhZJkRGRYUXYQgiDzowOozhVVdFkNJKgzhyd7k0BahVF4foXqV1gVq5cWbdgwYIpTU1NDdC59FqF5PF4qKKiImZHefm6mpoaWVEUCsQ8jDGIjoras2jRorMAwNpKOHgYTcawgCEi0pnR4TAajaQoBgxHtEide66A0cHJkydfCje0LSsrYx6Ph8+fP39pVVVVFpOYFtD/APUjIiIqOecB8EUnUm4ARAAiuNZBRIAMtetRlGJBDAkr7He5XMzj8YiHH36454kTJxZoqsoRrnS1gkRYC6ipqa1tU+jqcNOhWKxpGlysv1jdEptReDsP4+OwROZ2uxER6fMdO37rbWxQmCyFDWp7w6AoLJwfI7KwVI5JDCiMrSCya8Gt3RoIf+aZZ9LOnTs7VdM0CiME73wBMguZqgsuID4+zqwnuJ3uGgFDipiAAEIwukvAbNu2jQEAvP/++9MaGxsjGGP82gvNLKQOMYbQ1NTULITo1KwiAEgSg1CaiYAA15Mx5eXlQpIkuFBVNVFVVcJOjIPgIiwjI0ssFGFQCAKTyRSjh/rUyZdbVIlCS4td4+dto0vh8XislxobCoUQiB38nojAaDRFh2NUkYVHOCFEWDYwlO0I05CHD8ytt97KAADWrVuX16z6YwGxI8EgEYEp0hSnAxPSPVAoe4AtmwlnQxIihulHrg8w58+fRwAAr9ebL7gI1GQ6HI0NDWGpEmOsc9rr6Iv2NfOK6iIXXAXAEBYaIZQh6nLBu7a+PgWECFUqg+Ym3xUSbq9MKuteKRQbOvg8uFSAQgg4e/Z8NWMhmKrPhdcDGL2yhZxzuxACQtmPpubmduuuAEBOp1POyMiQnU6njBAiPtEVQwiBqqrK+fn5sl5mkIlI/uyzz6KDmdNS9ArDtkHnrAlZY9GTRWwN9xEiwzFuRoNikSQJNE0TLWkO0itvvWKfUzanDhFVANCOHTsGY24Z09gpyNQauPklSdICKoWI4Cx2/sHn8/WQJGlsXl4eHjp0CDBcUYfALhQwzOPx8EA4AQCmESNHBhjT6dR+VTUEG25ZlvmaZ9a8/dIza5pvmTh+u+pTFYNB1i5UV9/MOQfs2J0wXYW7Dx469N+JcxZhjBBNapPjSGXl/bIkS/fNvW/wC396YWewwQ7FmVDeUO7cLjJx17x5wyq+++62gj4FQ5uamsyqqiV11utFROScg6Io8aqqMkREj8fDJ02ddNue3XtuavT54NipE6NQN6p6otmZWiNjDKrOn8+oqa5eyrBFa4TgwIXgfvDTF1/tWE5ETkQkBgyux+gIGIkxxocNH/b0px9v/U1DQ8NlXoF1Yhb0LiSoqhrQe9q1a1fs3XN+9UyTr5kUJmlC1TAISBaOrdP7Qq0w6t0KWQjBL1RfuGnK9Cl3AsDryEBGQLhWl83asymIyIcNG+aqrDz6m4sXL3IA0CRJEowxwcLL5YALwaClVy0eXPzgYzU1NckMGScABRHlwF8XHAC2+Z3c2kVobKTDFT88SUQRmsp94UWMXQAmUJW77bbbbjp24vjjTU1NmtziT2XdxoQjWRRCQITJZAYAddasWd1Onz6zSNO0TjsB1yJcRBRerzdl8eLFQwSIi+FF3F3IlTweDzDG4ODhiiVer5f0usZVJYmqphIAGL8/dOCPDQ0Nhs56R9cyEFAQAIuNjT2yYsWKzxljcZ3FRBimV2JtfsPPnDkT3ej1DhRC4NVKmDEGXOUNr7zySh/vJe8Yzrm41vJExyrLKSoiEnt0z1uMiH6D0nmrg36hWXjAuFwuBAB47rnnLM0+XzwihpWbdBilIkTPnTt3ryPBsUpvunNord4jh5Z2Ku+KlcSWfnNw7ZczZFJiQsKWjRs3bgYAIE78epY2W0dzczMLDgP0wFPTNwFd2cQJAHn5U8t+Zzaba4QQCABcFYJpgktcCImIpHBVlYhA0zRUVRX9qoqCSHDOITYu1j9u3LjFnHMMw6Z2HZjHH3+cAABmzJhx0WA0NOpsEVrLA2UikoToAoUQaP/mzVHFxcV16alpv1cMBoaIUmJi4sGUlOTdSUlJe2xW61cmk6lefxZ1BoqiKNxut/utVqtqNptVRVGYLMtSVmbW8263+8fc3FxDa3h3HQrrcps8hg0fPrymZ69eBxBrhiKiZLfbq4wm03YikVpTXTPQ5/MRYwxDPlwQpKWlaQCAW7dufalnfv7vDAal4tv9395kNBg46RvO793rr6dPnZ6lM7K9uIoTkZSRnvHVC6tXz9y6datJURR1/fr1/9LQ2Hj3f3388VJEZHFxcaLVHF+HrsNlC3E6nay8vFxkpqe/VnXu3DCr1bp7+fLlkydOnHhWkRVwjij+7ffff/d7v98f0vWiJEFsbCwBACFi87x582ZHR0f/pJcrJJ2tWnREVFhpjclo9BYVFR0PsolP1NfXv4OIDS6Xi7ndbuqiqocPTHl5OYeW/vT/u//++59OSkp6bPz48Wdzc3ONlZWV6rZPPn0yvyB/+vETJ/oGbbBd6suShBaLBQNFdLfbvSXY+wWiYllR/KHMCzIG9fX1tS6Xi23ZskUaP348d7vdNQDwOQCg3tBj19Pbsfa8WVFRUePIkSPH9u/ffxcRYWVlpc/pdDK/6sec7JwVEaYI7KBw1NIxZAiqql6Kj49vAABwu92kN85ZW1tyyXvxQjgBGQCQe+lSsW/fPqEDgXrXgq6mkBLKFLAOXD0uW7Zsn9vt9gZco84mevHFFzdERUZW6aeoqD2KIiAwxEbdmwWCR96e0zAajGGhIklS25iM2mv9sn8QY1ofqksD2wAmJSYmeuPj49+XW6Ji3i5jEIFJco0sy4FmXIfikWQJwmFMuDka/IOBAV0a1MY4IxGhzWbbpBgMoMcmV9oERIiJiTqmq1unRjpwSvR6uNiudAGuWzEcoPU4B5WUlOw0Go2NRCS1BU+POSAqKmonEYHT6QyRAYafKdB1ZIS4ChsDIViEjzzyyJnIyKgKXQVEG2AkRZYpr1ve9iAwr7bC+Esww3lY30UmQzi2nPh1bNEGzIKqqhAZHbn/is6g3lKJiY6pePHFFw8GudJrl3DLGeL/ASNylcAEVCM6MvJg2+MWJAQpioLJycmvIyJ3Op0h9YSHuVnWUqAK43uheYiIQIKuO2NaaIPS0eAaS0t9SrDo6OiaO+644xUAwG3btoVMPDVN+6Wd0cEuBBcQGxdnC+e0Q1cMdGcM7DIwDoeDAACi4qIuMsZaC1mCC2E0GllOVvYzd911V7XT6ZRCHQ0DAOCqGsLYtFTNucbD9DYY1vmY62p8g4fBYKAAtRGREwnZZrEe+Oijj54HAKYHhKErfZwzCuGKEAA0TQ27SBbO0FSVrpkxRIRlZWVSWVmZdOnSJRkAZG+d16z3g4SqqmA2m7WSkpJfIWJzWVlZ2GX6qKgoG4U6MYIIzT4f6Z2Ha6rlIiISERiMxkhN0wIpBXaaRLbXMfB4PIEGfoABvCXH8Q7TOAfOuYiJiTEU9O5zz/PPP783UFAPl3n19fVhBTLNvuYIRVFCgi1LEnTWPgmwhISI04PPy6QSOFzdLryBDz0eD5eYxI8ePRq3YMGCokmTJk0eNGjQraNGjfr1qdOn7vL7fCImJkYZOHDQfRvfffcvACDppyJCNgJb1JxkX3PzjfoZow47kUII8vn9fZ999tn0oOSxA8ZAKBvDAEA0NjYmz58/v68+X8vJ9bIyye12C7fb3W5ILwEANxqNMHXq1AlHfzp6d11N3VCf35fANQ5cCCAhQOUaAACZTCZKTk55Jz091bP+rfUbEdGnu3U5kHi2fcCYMWOMH374oa+srOzWnbt2/a2xqZEzxjpjDkdEqXv3vLVffvHFHCIyuFwurU2MJAOAdsOAojXHjh+fj4I0wA41ghOR1K1b7kf79uwbo6q/2K9HH320R21t7RX1VgkA+MKFC4fu+PLL5VUXqoY2NTWB3qsmaDluHsiHJNAPCQEAREREgNlsPpSRkblq88aNb2BLdt0hQCtWrEh5+c9/2n3hwoVk/c4SCxHg8ciISKl/v34PbNmyZXU7hlMGAG3A4MFrjv796HxGpHVmKohIKAaF9czr8aL7cffjRqNRPPXUU9P3f7d/pc1qqwoGRmKM8TG33PJgRcWhZ+vr6xkAcMYYICILUbTmQgggIslkMoE5Lv7H7OzsP27evHltAKAA010uV9SePXtGVx6tXFZdU9Mt3PtFgat7kRGRLCszc1V+fv5ziYmJx/XKHQWAGeYcvubw4cPzIQQwOthClmVmjouvQ0R/TW2tIyYmprZvnz7TWMDIMsb46DGjXd999+1ztbW1wBgL0DucSr7EGJNkWRZ+v5+fOXe2+9fffLM6v6DX1xMnT75n2csvxwWuvtTV1fU6fvz4f1ZVVXUDABURw/aMjDG65L0Ex0+eeOCnY8f+zxNPPCHKysou+z1qVC0BUpiunQkhxPmqqvgz5846LBbL328tKxv+zjvvfMYCXmTytMmzDx2qeLyhoUFTFAXhKhpkRMQQUZJkWfj8Pn769Om8b7/d/6fyTZse2759u1ZYWCivXLly9+jRowtyuuV+qiiKorduKYy5NSKSEhMTzvS/od+Mjz744BEhROsxlbKyMgIAiDPHHZRlGUX4bRkhKzJkZWXumzd37s1PP/30AafTKTOPxyOWLVuWeuC7Ay/qN0jY1bZlg57GiIgiTBGQnJi0bnRJyZNExPbt26cBAHvuued+3LPrq5KC/F6/j4mKljRNg47AQUQQQmgyk+TcnJytjz7y6IANb294q21mn5+fTwAAxcXF5SaTqYlaDhVQKLAZY3JGesa2Va+tGrVkyZITZWVlUnl5uYaMMRg0aNBfjlQemUstpchrunOt665mMBjk3OycF3bv3r1Qt/qtwYVeHAcEENPLyu7Y+/W+1+vq6lCW5ct75QgguNBMJpOcm5Pzwu5duxf6fL6AQdfaTeEQ+aAhQ948cuTHO6CD/SAgcME1WZbltPS0d/fu3jMLEX3BMRhzu90ZZ8+enaW13EmW2kwgAEAjIk20XD3WqMWoddhaJSJNlmQ5Ozvr9V27di1UVVVqe88oUB0kAMXj8fzHiJHFM+Pj4knTNBHMHOJCMxqNco+8vGe/3PHlQp/Px1wuF+sAFHC5XEREeMuYMY/Fx8U3cFVj7TGRE9dkSZZzsrI37t29pwwRffrlkV8C0xGjRjycmJx0xT1Cq92mmQPvakhNoZS0VEpOTaGEpESy2m1kbrle1/a6nma126ioqOgTHYyQhjtwn3HSpEl3p6alBV5+QTaHXXMkOGjIkCFv6Fm1HI6KB67xTZ448Z601FSyWK1+W8Ll9yFtCXYaOHjgJv0qUbsBo1xXU3dL8PF3RATOOSkGRTKbLUccdtuWqOioQ5ER0Q1+tdnQ2NCYVlNbN6y2unqU19sgEVCg+SYE5ywxIfHE/fffPxMRweVyhbx8tW/fPrWwsFDZtGnTazc5bxp4uOLwfYJIFSSUxMSU73fs2DEPESUiCstIB15zsGnLlj87nc6iQ4cr7lVVVWWMKQDAEUBOT8vYtuvLXdMQkbtcrvaLaT3ye543Wy1k1y9XWmxWLTU9jYpHjnyMiEwdFbAfeuih/oWFhRuTU5LJardpFqtVy87K4vPmzRsULLlwXbHOrsiCgoKfYuPjtIysTP/8+fNv7OpcQSmHRETSjQMHbrInOMhqtzVb7TbqVVBw8N13340PlVpAdm6OarZaSP+xlpicRCWjS54IeoAcfGtWj0da3xRUPHLkvzuSEighMZFKSkoeCUS7XTXYgc3PmjVrclp6GhXeWLS2K28L6gAcJCJDn75937PabZSVk129aNGivLDAzumWS+aWl+MIs9VCeT16nNSZInWGaOAuNiJCYWHhfxYVFe01GAyB0Pxq3T2TZRmKi4u/mDJlyiDo4OpvuCOwfiIyFBUV/deYMWPuDVtwObm5jfpbgzSr3UZ9+vf7SC/2SGGqAFu2bFncihUrLG0K/3iVUob9+/dHXeX7azpaIxgMhkARK7x58wt6/aSrkt9qt1Hffn0/COj8tS5KCX3B/X9qdFlIzBQRsVOSJArU+YgoUmlprVJX9TmYRYsXL3aUlpa+dpVR9PU+xNjle5ssKzvjbyajCUmQRETQ1NTU740330wI1tEwHxw4KSEDgNi9e/cDP/zww+2gv3GsiwujfwBrqKs6qBQUFHxjsVrJ5rD7HIkJVFxc/IKefxjgKt5Ft3Tp0rysnOym7nndv9bVCeGfccyePbskMzOTzFaL32qzaWmpaWLmzJl3BVjldDo7jDoDhfKATVq2bFlqfkGvA/ZEB5WWlv7b1brv/+9DPyIPo0pHuVPSUnVwrFpGZgaVjh37sN64b1vlu+INH7Isw+zZs0t79Ox5NC4+ngoKCo5t2bLFrMcS/5SMQQCQFEWB0rFjn0tNTyOz1UJmq8WflJpCffr13Tt16tS5b775ZqrRaGy9qscYA6PRCG+99ZZ9xowZkwYMGPBuanqqiDPHU263brV33nnnjV20U//rQLmsoDV52rS5B7//7pm6ujqzz+8HQIBIUyRERUZeioqKOqIoynFCrAeAWL/Pl9bQ2JjR3Nhob2xsBIPJCA67Y/+AoqI5r7766jddbaX8bwWmtRj+l9WrM9a9/fa/nD5zZoa3wZvS3NwMnHP9pRItjAkUoxljYDKZwGI2H8xKz/jLpi1b1uhNt39aUNr1FsEb2r59u33VqlWjTp85M+ripYsFgvMUVdWMTGIyQ/TKsnzKYrN+m5aWseWNtWu3ImJTUCFKwD/x+G+nGfr/b+JBPAAAAABJRU5ErkJggg==";
const LOGO_HERO = LOGO_NAV;

// ─── Color Tokens ───
const C = {
  bg: "#F4F1EC",
  bgAlt: "#EBE7E0",
  black: "#111111",
  darkGray: "#333333",
  midGray: "#777777",
  lightGray: "#BFBBB4",
  accent: "#C8102E",
  white: "#FFFFFF",
};

// ─── Product Data ───
const PRODUCTS = [
  { id: 1, name: "OVERSIZED LOGO TEE", price: 65, category: "tops", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
  { id: 2, name: "WASHED CARGO PANTS", price: 120, category: "bottoms", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
  { id: 3, name: "HEAVYWEIGHT HOODIE", price: 95, category: "tops", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
  { id: 4, name: "STRUCTURED CAP", price: 40, category: "accessories", img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=750&fit=crop", sizes: ["ONE SIZE"] },
  { id: 5, name: "GRAPHIC CREWNECK", price: 85, category: "tops", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
  { id: 6, name: "RELAXED FIT SHORTS", price: 70, category: "bottoms", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
  { id: 7, name: "CANVAS TOTE BAG", price: 35, category: "accessories", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=750&fit=crop", sizes: ["ONE SIZE"] },
  { id: 8, name: "ESSENTIAL LONG SLEEVE", price: 55, category: "tops", img: "https://images.unsplash.com/photo-1618354691229-88d47f285158?w=600&h=750&fit=crop", sizes: ["S","M","L","XL"] },
];

// ─── Styles ───
const styles = {
  app: { fontFamily: "'DM Sans', sans-serif", background: C.bg, color: C.black, minHeight: "100vh", position: "relative", overflowX: "hidden" },

  // Nav
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.bg, borderBottom: `1px solid ${C.lightGray}40`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" },
  logo: { display: "flex", alignItems: "center", gap: 2, cursor: "pointer", color: C.black, userSelect: "none", justifySelf: "center" },
  navLinks: { display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" },
  navLink: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", color: C.darkGray, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "color 0.2s", padding: "2px 0", lineHeight: 1.5 },
  cartBtn: { position: "relative", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", color: C.darkGray, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: "2px 0", lineHeight: 1.5, textAlign: "left" },
  cartBadge: { position: "absolute", top: -6, right: -16, background: C.accent, color: C.white, fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },

  // Hero
  hero: { maxWidth: 1200, margin: "0 auto", padding: "180px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "90vh" },
  heroText: { display: "flex", flexDirection: "column", gap: 24 },
  heroTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px, 10vw, 120px)", lineHeight: 0.9, letterSpacing: "0.02em", color: C.black },
  heroSub: { fontSize: 16, lineHeight: 1.7, color: C.midGray, maxWidth: 400, fontWeight: 300 },
  heroCta: { marginTop: 16, padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, alignSelf: "flex-start", transition: "all 0.3s" },
  heroImgWrap: { position: "relative", aspectRatio: "4/5", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%) contrast(1.05)" },
  heroImgOverlay: { position: "absolute", bottom: 24, left: 24, fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.2em", color: C.white, background: C.black, padding: "8px 16px" },

  // Marquee
  marquee: { overflow: "hidden", borderTop: `1px solid ${C.lightGray}40`, borderBottom: `1px solid ${C.lightGray}40`, padding: "20px 0", whiteSpace: "nowrap" },
  marqueeInner: { display: "inline-flex", gap: 60, animation: "marquee 20s linear infinite" },
  marqueeText: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.3em", color: C.lightGray },

  // Section
  section: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px" },
  sectionTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.04em", marginBottom: 12, color: C.black },
  sectionSub: { fontSize: 14, color: C.midGray, marginBottom: 48, fontWeight: 300, letterSpacing: "0.02em" },

  // Product Grid
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 },
  productCard: { cursor: "pointer", position: "relative", overflow: "hidden", background: C.bgAlt },
  productImg: { width: "100%", aspectRatio: "3/4", objectFit: "cover", transition: "transform 0.6s ease", filter: "grayscale(20%)" },
  productInfo: { padding: "16px 4px" },
  productName: { fontSize: 13, letterSpacing: "0.1em", fontWeight: 500, marginBottom: 6, textTransform: "uppercase" },
  productPrice: { fontSize: 14, color: C.midGray, fontWeight: 300 },

  // Filters
  filters: { display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" },
  filterBtn: (active) => ({ padding: "10px 24px", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", border: `1px solid ${active ? C.black : C.lightGray}`, background: active ? C.black : "transparent", color: active ? C.bg : C.darkGray, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.25s" }),

  // About
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" },
  aboutImg: { width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(40%)" },
  aboutText: { fontSize: 15, lineHeight: 1.9, color: C.darkGray, fontWeight: 300 },
  aboutValues: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 40 },
  valueCard: { padding: 24, border: `1px solid ${C.lightGray}40` },
  valueTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.08em", marginBottom: 8 },
  valueText: { fontSize: 13, lineHeight: 1.7, color: C.midGray, fontWeight: 300 },

  // Contact
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 },
  formGroup: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 },
  label: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.midGray, fontWeight: 500 },
  input: { padding: "14px 0", fontSize: 15, border: "none", borderBottom: `1px solid ${C.lightGray}`, background: "transparent", color: C.black, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s" },
  textarea: { padding: "14px 0", fontSize: 15, border: "none", borderBottom: `1px solid ${C.lightGray}`, background: "transparent", color: C.black, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", minHeight: 120 },
  submitBtn: { padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginTop: 8, transition: "opacity 0.2s" },
  contactInfo: { display: "flex", flexDirection: "column", gap: 32, paddingTop: 12 },
  contactItem: { borderLeft: `2px solid ${C.black}`, paddingLeft: 20 },
  contactLabel: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.midGray, fontWeight: 500, marginBottom: 6 },
  contactVal: { fontSize: 15, color: C.black, fontWeight: 400 },

  // Cart Drawer
  cartOverlay: (open) => ({ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s" }),
  cartDrawer: (open) => ({ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 90vw)", background: C.bg, zIndex: 201, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column" }),
  cartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", borderBottom: `1px solid ${C.lightGray}40` },
  cartTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.08em" },
  cartClose: { background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.black },
  cartItems: { flex: 1, overflowY: "auto", padding: "20px 28px" },
  cartItem: { display: "flex", gap: 16, paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${C.lightGray}30` },
  cartItemImg: { width: 72, height: 90, objectFit: "cover", flexShrink: 0, filter: "grayscale(20%)" },
  cartItemInfo: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" },
  cartItemName: { fontSize: 12, letterSpacing: "0.08em", fontWeight: 500, textTransform: "uppercase" },
  cartItemSize: { fontSize: 11, color: C.midGray },
  cartItemBottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cartItemPrice: { fontSize: 14, fontWeight: 500 },
  cartItemRemove: { fontSize: 11, color: C.midGray, cursor: "pointer", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" },
  cartFooter: { padding: "24px 28px", borderTop: `1px solid ${C.lightGray}40` },
  cartTotal: { display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 16, fontWeight: 500 },
  checkoutBtn: { width: "100%", padding: "16px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  emptyCart: { textAlign: "center", padding: "60px 0", color: C.midGray, fontSize: 14 },

  // Quick View Modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { background: C.bg, maxWidth: 800, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", maxHeight: "85vh", overflow: "hidden", position: "relative" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" },
  modalContent: { padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, overflowY: "auto" },
  modalName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: "0.04em" },
  modalPrice: { fontSize: 20, color: C.midGray, fontWeight: 300 },
  modalSizes: { display: "flex", gap: 10, flexWrap: "wrap" },
  sizeBtn: (active) => ({ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, border: `1px solid ${active ? C.black : C.lightGray}`, background: active ? C.black : "transparent", color: active ? C.bg : C.darkGray, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }),
  addToCartBtn: { padding: "16px 48px", background: C.black, color: C.bg, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginTop: 8 },
  modalClose: { position: "absolute", top: 16, right: 16, background: C.bg, border: "none", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", color: C.black, zIndex: 2 },

  // Footer
  footer: { borderTop: `1px solid ${C.lightGray}40`, marginTop: 40 },
  footerInner: { maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 },
  footerLogo: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.06em", marginBottom: 12 },
  footerText: { fontSize: 13, lineHeight: 1.7, color: C.midGray, fontWeight: 300, maxWidth: 280 },
  footerColTitle: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 },
  footerLink: { display: "block", fontSize: 13, color: C.midGray, marginBottom: 10, cursor: "pointer", fontWeight: 300, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", padding: 0, textAlign: "left" },
  footerBottom: { maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.lightGray}30`, fontSize: 12, color: C.lightGray },

  // Newsletter
  newsletter: { background: C.black, color: C.bg, padding: "60px 24px", textAlign: "center" },
  nlTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "0.06em", marginBottom: 12 },
  nlSub: { fontSize: 14, color: C.lightGray, fontWeight: 300, marginBottom: 32 },
  nlForm: { display: "flex", gap: 0, maxWidth: 460, margin: "0 auto" },
  nlInput: { flex: 1, padding: "14px 20px", fontSize: 14, border: `1px solid ${C.midGray}`, borderRight: "none", background: "transparent", color: C.bg, fontFamily: "'DM Sans', sans-serif", outline: "none" },
  nlBtn: { padding: "14px 28px", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", background: C.bg, color: C.black, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
};

// ─── Scroll Animation Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimateIn({ children, animation = "fadeInUp", delay = 0, duration = 0.7, style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ ...style, opacity: visible ? 1 : 0, animation: visible ? `${animation} ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s both` : "none" }}>
      {children}
    </div>
  );
}

// ─── Nav Scroll Hook ───
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

// ─── Page Components ───

function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroText}>
          <AnimateIn animation="fadeInUp" delay={0.1} duration={0.8}>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", color: C.midGray, textTransform: "uppercase", fontWeight: 500 }}>EST. 2026</div>
          </AnimateIn>
          <AnimateIn animation="heroText" delay={0.3} duration={0.9}>
            <h1 style={styles.heroTitle}>WEAR</h1>
          </AnimateIn>
          <AnimateIn animation="heroText" delay={0.45} duration={0.9}>
            <h1 style={{ ...styles.heroTitle, marginTop: -8 }}>YOUR</h1>
          </AnimateIn>
          <AnimateIn animation="heroText" delay={0.6} duration={0.9}>
            <h1 style={{ ...styles.heroTitle, marginTop: -8, WebkitTextStroke: `2px ${C.black}`, color: "transparent" }}>IDENTITY</h1>
          </AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.8} duration={0.7}>
            <p style={styles.heroSub}>
              Maskout is more than clothing — it's a statement. Urban essentials designed for those who move different.
            </p>
          </AnimateIn>
          <AnimateIn animation="fadeInUp" delay={1.0} duration={0.7}>
            <button className="btn-hover" style={styles.heroCta} onClick={() => onNavigate("shop")}>
              Explore Collection
            </button>
          </AnimateIn>
        </div>
        <AnimateIn animation="slideInRight" delay={0.4} duration={1.0}>
          <div style={styles.heroImgWrap}>
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop" alt="Maskout hero" style={styles.heroImg} className="img-zoom" />
            <div style={styles.heroImgOverlay}>SS26 COLLECTION</div>
          </div>
        </AnimateIn>
      </div>

      {/* Marquee */}
      <div style={styles.marquee}>
        <div style={styles.marqueeInner}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: 60 }}>
              {["STREETWEAR", "CULTURE", "COMMUNITY", "IDENTITY", "MOVEMENT", "EXPRESSION"].map(t => (
                <span key={t + i} style={styles.marqueeText}>{t} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <div style={styles.section}>
        <AnimateIn animation="fadeInUp" delay={0}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <h2 style={styles.sectionTitle}>UPCOMING COLLECTIONS</h2>
              <p style={{ ...styles.sectionSub, marginBottom: 0 }}>Four distinct directions. Launching soon.</p>
            </div>
            <button className="btn-hover" style={{ ...styles.navLink, fontSize: 12 }} onClick={() => onNavigate("shop")}>
              View All →
            </button>
          </div>
        </AnimateIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {COLLECTIONS.map((c, i) => (
            <AnimateIn key={c.id} animation="fadeInUp" delay={i * 0.12} duration={0.7}>
              <CollectionSlot collection={c} />
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Brand Banner */}
      <div style={{ background: C.bgAlt, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, textAlign: "center" }}>
          {[
            { num: "01", title: "PREMIUM MATERIALS", text: "Heavyweight fabrics built to last through every season." },
            { num: "02", title: "DESIGNED IN-HOUSE", text: "Every piece is original. No templates, no shortcuts." },
            { num: "03", title: "COMMUNITY FIRST", text: "Built by the culture, for the culture. Always." },
          ].map((item, i) => (
            <AnimateIn key={item.num} animation="fadeInUp" delay={i * 0.15} duration={0.7}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.lightGray, marginBottom: 12 }}>{item.num}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.08em", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.midGray, lineHeight: 1.7, fontWeight: 300 }}>{item.text}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <AnimateIn animation="fadeIn" delay={0} duration={0.8}>
        <div style={styles.newsletter}>
          <AnimateIn animation="fadeInUp" delay={0.1}><div style={styles.nlTitle}>JOIN THE MOVEMENT</div></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.2}><div style={styles.nlSub}>Early access to drops, exclusive offers, and community updates.</div></AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.3}>
            <div style={styles.nlForm}>
              <input type="email" placeholder="Your email" style={styles.nlInput} />
              <button className="btn-hover" style={styles.nlBtn}>Subscribe</button>
            </div>
          </AnimateIn>
        </div>
      </AnimateIn>
    </div>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={styles.productCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: "hidden" }}>
        <img src={product.img} alt={product.name} style={{ ...styles.productImg, transform: hovered ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={styles.productInfo}>
        <div style={styles.productName}>{product.name}</div>
      </div>
    </div>
  );
}

const COLLECTIONS = [
  { id: 1, title: "SUMMER '26", subtitle: "Lightweight layers for warm days", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700&h=900&fit=crop", season: "SS26" },
  { id: 2, title: "STREETCORE", subtitle: "Raw urban essentials", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&h=900&fit=crop", season: "CORE" },
  { id: 3, title: "AFTER DARK", subtitle: "Evening-ready statement pieces", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&h=900&fit=crop", season: "AW26" },
  { id: 4, title: "ESSENTIALS", subtitle: "Everyday wardrobe staples", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=900&fit=crop", season: "YEAR-ROUND" },
];

function CollectionSlot({ collection }) {
  return (
    <div className="collection-card hover-lift" style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: C.bgAlt }}>
      <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
        <img src={collection.img} alt={collection.title} className="img-zoom" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%) brightness(0.7)" }} />
      </div>
      <div className="collection-overlay" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.65) 100%)" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#FFFFFF90", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>{collection.season}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", color: C.white, marginBottom: 4 }}>{collection.title}</div>
        <div style={{ fontSize: 13, color: "#FFFFFF99", fontWeight: 300, marginBottom: 16 }}>{collection.subtitle}</div>
        <div className="launch-badge" style={{ padding: "10px 24px", border: "1px solid #FFFFFF60", color: C.white, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, alignSelf: "flex-start", transition: "all 0.3s", background: "transparent" }}>
          Launching Soon
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  return (
    <div style={{ ...styles.section, paddingTop: 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>COLLECTIONS</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>Explore our upcoming drops — four distinct directions, one identity.</p></AnimateIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {COLLECTIONS.map((c, i) => (
          <AnimateIn key={c.id} animation="scaleIn" delay={i * 0.1} duration={0.6}>
            <CollectionSlot collection={c} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ ...styles.section, paddingTop: 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>OUR STORY</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>The culture behind the clothes.</p></AnimateIn>
      <div style={styles.aboutGrid}>
        <AnimateIn animation="slideInLeft" duration={0.9}>
          <img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&h=900&fit=crop" alt="Maskout studio" style={styles.aboutImg} className="img-zoom" />
        </AnimateIn>
        <div>
          <AnimateIn animation="fadeInUp" delay={0.2}>
            <p style={styles.aboutText}>
              Maskout was born from the streets — a response to mass-produced fashion that says nothing. We believe what you wear should speak before you do.
            </p>
          </AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.35}>
            <p style={{ ...styles.aboutText, marginTop: 20 }}>
              Every piece is designed in-house with obsessive attention to fit, fabric, and detail. We source premium heavyweight cotton, custom-dyed fabrics, and construction methods that ensure each garment gets better with age.
            </p>
          </AnimateIn>
          <AnimateIn animation="fadeInUp" delay={0.5}>
            <p style={{ ...styles.aboutText, marginTop: 20 }}>
              This isn't fast fashion. This is wardrobe architecture — pieces that become part of your identity.
            </p>
          </AnimateIn>
          <div style={styles.aboutValues}>
            {[
              { title: "QUALITY", text: "Premium materials, meticulous construction." },
              { title: "ORIGINALITY", text: "Every design is created from scratch." },
              { title: "COMMUNITY", text: "Built with and for the culture." },
              { title: "LONGEVITY", text: "Made to outlast every trend." },
            ].map((v, i) => (
              <AnimateIn key={v.title} animation="fadeInUp" delay={0.6 + i * 0.1}>
                <div className="hover-lift" style={styles.valueCard}>
                  <div style={styles.valueTitle}>{v.title}</div>
                  <div style={styles.valueText}>{v.text}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ ...styles.section, paddingTop: 180 }}>
      <AnimateIn animation="fadeInUp"><h2 style={styles.sectionTitle}>GET IN TOUCH</h2></AnimateIn>
      <AnimateIn animation="fadeInUp" delay={0.1}><p style={styles.sectionSub}>Questions, wholesale inquiries, or just want to connect — we're here.</p></AnimateIn>
      <div style={styles.contactGrid}>
        <AnimateIn animation="slideInLeft" delay={0.2} duration={0.8}>
        <div>
          {submitted ? (
            <div style={{ padding: "60px 0", textAlign: "center", animation: "scaleIn 0.5s ease both" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>MESSAGE SENT ✓</div>
              <p style={{ color: C.midGray, fontSize: 14 }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input type="text" style={styles.input} placeholder="Your full name" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input type="email" style={styles.input} placeholder="you@email.com" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input type="text" style={styles.input} placeholder="What's this about?" onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea style={styles.textarea} placeholder="Tell us more..." onFocus={e => e.target.style.borderColor = C.black} onBlur={e => e.target.style.borderColor = C.lightGray} />
              </div>
              <button className="btn-hover" style={styles.submitBtn} onClick={() => setSubmitted(true)}>
                Send Message
              </button>
            </>
          )}
        </div>
        </AnimateIn>
        <AnimateIn animation="slideInRight" delay={0.3} duration={0.8}>
        <div style={styles.contactInfo}>
          {[
            { label: "Email", value: "hello@maskout.com" },
            { label: "Instagram", value: "@maskout" },
            { label: "Location", value: "Los Angeles, CA" },
            { label: "Hours", value: "Mon – Fri, 10am – 6pm PST" },
          ].map((c, i) => (
            <div key={c.label} style={styles.contactItem}>
              <div style={styles.contactLabel}>{c.label}</div>
              <div style={styles.contactVal}>{c.value}</div>
            </div>
          ))}
        </div>
        </AnimateIn>
      </div>
    </div>
  );
}

// ─── Quick View Modal ───
function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 800);
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <img src={product.img} alt={product.name} style={styles.modalImg} />
        <div style={styles.modalContent}>
          <div style={styles.modalName}>{product.name}</div>
          <div style={styles.modalPrice}>${product.price}</div>
          <div>
            <div style={{ ...styles.label, marginBottom: 12 }}>Select Size</div>
            <div style={styles.modalSizes}>
              {product.sizes.map(s => (
                <button key={s} style={styles.sizeBtn(selectedSize === s)} onClick={() => setSelectedSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            style={{ ...styles.addToCartBtn, opacity: selectedSize ? 1 : 0.4, background: added ? "#2d6a4f" : C.black }}
            onClick={handleAdd}
            disabled={!selectedSize}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
          <p style={{ fontSize: 12, color: C.midGray, lineHeight: 1.6, fontWeight: 300 }}>
            Free shipping on orders over $150. Premium heavyweight construction. Relaxed fit.
          </p>
        </div>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

// ─── Cart Drawer ───
function CartDrawer({ open, onClose, items, onRemove }) {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (
    <>
      <div style={styles.cartOverlay(open)} onClick={onClose} />
      <div style={styles.cartDrawer(open)}>
        <div style={styles.cartHeader}>
          <div style={styles.cartTitle}>YOUR CART ({items.length})</div>
          <button style={styles.cartClose} onClick={onClose}>✕</button>
        </div>
        <div style={styles.cartItems}>
          {items.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, marginBottom: 8, color: C.black }}>CART IS EMPTY</div>
              <p>Add some pieces to get started.</p>
            </div>
          ) : items.map((item, i) => (
            <div key={i} style={styles.cartItem}>
              <img src={item.img} alt={item.name} style={styles.cartItemImg} />
              <div style={styles.cartItemInfo}>
                <div>
                  <div style={styles.cartItemName}>{item.name}</div>
                  <div style={styles.cartItemSize}>Size: {item.size}</div>
                </div>
                <div style={styles.cartItemBottom}>
                  <div style={styles.cartItemPrice}>${item.price}</div>
                  <button style={styles.cartItemRemove} onClick={() => onRemove(i)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={styles.cartFooter}>
            <div style={styles.cartTotal}>
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button style={styles.checkoutBtn}>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Footer ───
function Footer({ onNavigate }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div>
          <div style={{ ...styles.footerLogo, display: "flex", alignItems: "center", gap: 2 }}>
            <img src={LOGO_NAV} alt="" style={{ height: 44, width: "auto" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: "0.04em", lineHeight: 1, marginLeft: -1 }}>ASKOUT</span>
          </div>
          <p style={styles.footerText}>Urban essentials for those who move different. Premium streetwear designed in Los Angeles.</p>
        </div>
        <div>
          <div style={styles.footerColTitle}>Shop</div>
          {["All Products", "Tops", "Bottoms", "Accessories"].map(l => (
            <button key={l} style={styles.footerLink} onClick={() => onNavigate("shop")}>{l}</button>
          ))}
        </div>
        <div>
          <div style={styles.footerColTitle}>Company</div>
          {["About", "Contact", "Careers", "Press"].map(l => (
            <button key={l} style={styles.footerLink} onClick={() => onNavigate(l.toLowerCase())}>{l}</button>
          ))}
        </div>
        <div>
          <div style={styles.footerColTitle}>Follow</div>
          {["Instagram", "Twitter / X", "TikTok", "YouTube"].map(l => (
            <button key={l} style={styles.footerLink}>{l}</button>
          ))}
        </div>
      </div>
      <div style={styles.footerBottom}>
        <span>© 2026 Maskout. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function MaskoutApp() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const scrolled = useScrolled(30);

  useEffect(() => {
    if (!document.getElementById("maskout-fonts")) {
      const link = document.createElement("link");
      link.id = "maskout-fonts";
      link.rel = "stylesheet";
      link.href = FONTS_URL;
      document.head.appendChild(link);
    }
    if (!document.getElementById("maskout-keyframes")) {
      const s = document.createElement("style");
      s.id = "maskout-keyframes";
      s.textContent = `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-60px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(60px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.92); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes heroText { 0% { opacity: 0; transform: translateY(50px) skewY(2deg); } 100% { opacity: 1; transform: translateY(0) skewY(0); } }
        @keyframes lineGrow { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease !important; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .btn-hover { transition: all 0.3s cubic-bezier(0.16,1,0.3,1) !important; }
        .btn-hover:hover { transform: scale(1.03); opacity: 0.9; }
        .nav-link-hover { position: relative; }
        .nav-link-hover::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #111; transition: width 0.3s ease; }
        .nav-link-hover:hover::after { width: 100%; }
        .img-zoom { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease !important; }
        .img-zoom:hover { transform: scale(1.06); filter: grayscale(0%) !important; }
        .collection-overlay { transition: all 0.5s cubic-bezier(0.16,1,0.3,1) !important; }
        .collection-card:hover .collection-overlay { background: linear-gradient(transparent 20%, rgba(0,0,0,0.75) 100%) !important; }
        .collection-card:hover .launch-badge { background: rgba(255,255,255,0.2) !important; border-color: #FFF !important; }
      `;
      document.head.appendChild(s);
    }
  }, []);

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addToCart = (item) => setCartItems(prev => [...prev, item]);
  const removeFromCart = (i) => setCartItems(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div style={styles.app}>
      {/* Nav */}
      <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.3s ease, padding 0.3s ease" }}>
        <div style={{ ...styles.navInner, padding: scrolled ? "10px 24px" : "18px 24px", transition: "padding 0.3s ease" }}>
          <div style={styles.navLinks}>
            {[["home", "Home"], ["shop", "Shop"], ["about", "About"], ["contact", "Contact"]].map(([key, label]) => (
              <button
                key={key}
                className="nav-link-hover"
                style={{ ...styles.navLink, color: page === key ? C.black : C.darkGray, fontWeight: page === key ? 700 : 500 }}
                onClick={() => navigate(key)}
              >
                {label}
              </button>
            ))}
            <button className="nav-link-hover" style={styles.cartBtn} onClick={() => setCartOpen(true)}>
              Cart
              {cartItems.length > 0 && <span style={{ ...styles.cartBadge, animation: "pulse 1.5s ease infinite" }}>{cartItems.length}</span>}
            </button>
          </div>
          <div style={{ ...styles.logo, transition: "all 0.3s ease" }} onClick={() => navigate("home")}>
            <img src={LOGO_NAV} alt="" style={{ height: scrolled ? 52 : 72, width: "auto", display: "block", transition: "height 0.3s ease" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: scrolled ? 38 : 52, letterSpacing: "0.04em", lineHeight: 1, marginLeft: -2, transition: "font-size 0.3s ease" }}>ASKOUT</span>
          </div>
          <div />
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "shop" && <ShopPage />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Quick View */}
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAddToCart={addToCart} />}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={removeFromCart} />
    </div>
  );
}
