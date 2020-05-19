import copy


def triangles():
    yield [1]
    yield [1,1]
    L = [1,1]
    while True:
        L = [1] + [L[i] + L[i + 1] for i in range(0, len(L) - 1)] + [1]
        yield L


t = triangles()

print(next(t))
print(next(t))
print(next(t))
print(next(t))
print(next(t))
print(next(t))
print(next(t))
